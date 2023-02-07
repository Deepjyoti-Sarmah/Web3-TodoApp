import {useEffect} from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContract, useSigner } from 'wagmi'
// import {CONTRACT_ADDRESS} from "./contract.js"
import {abi} from "./contract/TodoList.json"

const CONTRACT_ADDRESS = "0xad802fcd349caadd431fccb7028a374c0b33a2e3";

function App() {

  const { address } = useAccount()
  const {data: signer} = useSigner()
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: abi.abi,
    signerOrProvider: signer
  })

  console.log("CONTRACT", contract);

  const getTasks = async () => {
		try {
      let tasks = []
			let tasks_count = await contract.count();
			console.log("TOTAL NUMBER OF TASKS ", tasks_count.toString());
      if(tasks_count) {
        tasks_count = (+tasks_count)
        for(let i = 0; i < tasks_count; i++) {
          const task = await contract.tasks(i)
          if(task) {
            tasks.push(task)
          }
        }
      }
      console.log(tasks)
		} catch (err) {
			console.log(err);
		}
	};


  useEffect (() => {
    if (contract) {
      getTasks();
    }
  }, [contract]);

	return (
    <div className="flex flex-col justify-center items-center bg-black text-white">
      <div className="flex items-center justify-between w-full px-4 py-2">
        <p className="text-xl font-bold">Todo-List</p>
        {
          address && (
            <ConnectButton />
          )
        }
      </div>
      <div style={{ minHeight: '95vh' }} className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-4xl font-extrabold">Todo List</h1>
        {
          !address && (
            <ConnectButton />
          )
        }
      </div>
    </div>
	);
}

export default App;