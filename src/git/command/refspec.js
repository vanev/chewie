// Git.Command.refspec :: Git.Command -> String
const refspec = ({ src, dst }) => `${src}:${dst}`

export default refspec
