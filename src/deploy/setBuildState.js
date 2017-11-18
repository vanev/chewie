import { Future } from "ramda-fantasy"
import { assoc, __, compose, map, chain } from "ramda"
import * as Travis from "../travis"

// getBranchState :: Deploy.Options -> Future Error String
const getBranchState = ({ reference }) => compose(
  chain(Travis.getBranchState(reference)),
  chain(Travis.authenticate),
  Future.of
)({ empty: "object" })

// Deploy.setBuildState :: Deploy.Options -> Future Error Deploy.Options
const setBuildState = (options) => compose(
  map(assoc("buildState", __, options)),
  chain(getBranchState),
  Future.of
)(options)

export default setBuildState
