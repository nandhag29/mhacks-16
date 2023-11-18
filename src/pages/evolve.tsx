import Link from "next/link";

const images = ["biif.png", "boof.png", "buuf.png"]

function which_evo(point: number): string {

    if (point < 3 && point > 9){
        return "buuf.png";
    }
    else if (point >= 9){
        return "boof.png";
    }

    return "biif.png";
    
}

export default function evolv(){
    return <img src={which_evo(3)}></img>
}


