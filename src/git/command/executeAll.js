import { map } from "ramda"
import execute from "./execute"

// Git.Command.executeAll :: [Git.Command] -> Promise<[Git.Result]>
const executeAll = (commands) => Promise.all(map(execute)(commands))

export default executeAll
