export const repoFragment = (owner, name, cursor=0) => 
`repository(owner: ${owner} name:${name}){
    name:
}
`