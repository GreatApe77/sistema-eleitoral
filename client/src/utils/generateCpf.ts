export function generateCpf(){
    return Math.random().toString().slice(2, 13);
}