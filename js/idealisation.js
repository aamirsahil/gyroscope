
document.getElementById("left").href = "reality.html";
document.getElementById("right").href = "geometric_a.html";

function Changer(value){
    const docx = document.documentElement;
    // docx.style.setProperty('--real',1-2*value);
    // docx.style.setProperty('--ideal',2*value);
    if (value>0.1){docx.style.setProperty('--x1',1);}
    else{docx.style.setProperty('--x1',0);}
    if (value>0.5){
        docx.style.setProperty('--x2',1);
        docx.style.setProperty('--x3',2-2*value);
    }  
    else {
        docx.style.setProperty('--x2',0);
        docx.style.setProperty('--x3',1);
    }
    if (value>0.9)
    { docx.style.setProperty('--x4',1); }
    else {docx.style.setProperty('--x4',0);}
}
