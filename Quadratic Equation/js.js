document.querySelector("#button").onclick = function(){
    var info = document.getElementById('info');
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var c = document.getElementById('c').value;

    if(a===""){
        info.classList.remove("success");
        info.classList.add("error");
        info.innerHTML= "'а' не может быть пустым, это линейное уравнение!";
        return;
    }

    if(a=="0"){
        info.classList.remove("success");
        info.classList.add("error");
        info.innerHTML= "'а' не может равняться нулю, это линейное уравнение!";
        return;
    }

    var er = b+c;
    if(er===""){
        info.classList.remove("success");
        info.classList.add("error");
        info.innerHTML= "b и с пусты, введите квадратное уравнения";
        return;
    }
    if(er==="00"){
        info.classList.remove("success");
        info.classList.add("error");
        info.innerHTML= "b и с равняются нулю, введите квадратное уравнения";
        return;
    }

    info.classList.remove("error");
    info.classList.add("success");

    var discriminant = b*b-4*a*c;

    if(Math.sign(discriminant)=="-1"){
        info.classList.remove("success");
        info.classList.add("error");
        info.innerHTML= "Дискриминант" + " (" + discriminant + ") " + "отрицательный, корней нет.";
        return;
    }

    var x1 = (-b+Math.sqrt(discriminant))/(2*a);
    var x2 = (-b-Math.sqrt(discriminant))/(2*a);

    if(discriminant=="0"){
        info.innerHTML= "Дискриминант равен " + discriminant + ", один действительный корень x= " + x1;
        return;
    }

    if(!Number.isInteger(x1)){
        info.innerHTML= "Ответ: d= " +discriminant + "; x₁= " + x1.toFixed(2) + "; x₂= " + x2.toFixed(2);
        return;
    }
    if(!Number.isInteger(x2)){
        info.innerHTML= "Ответ: d= " +discriminant + "; x₁= " + x1.toFixed(2) + "; x₂= " + x2.toFixed(2);
        return;
    }

    info.innerHTML= "Ответ: d= " +discriminant + "; x₁= " + x1 + "; x₂= " + x2;

}
