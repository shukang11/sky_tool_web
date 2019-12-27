export function getDateStringFromTimestrap(time: string): string {
    var result: string = "";
    if (time.length === 10) {
        time += "000"
    }
    const date = new Date(Number(time));
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = date.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds(); 
    result = Y+M+D+h+m+s;
    console.log(result);
    console.log(time);
    return result;
}