function screenTable(){
    var screenHeight = window.innerHeight; //Видимая высота экрана
    var screenRows = ""; // HTML код для ячеек 
    var quantityRowsOnScreen = 0; // Счетчик ячеек, которые поместятся на экран 
    var quantity = 0; // Счетчик уже показанных ячеек на экране 
    var headers = document.getElementsByClassName("header"); // 2 верхние статичных ячейки 
    var sumHeight = headers[1].offsetHeight + headers[0].offsetHeight; // Сумма длины ячеек, которые отображаются
    // на экране (сходу занес в неё размеры этих двух верхних ячеек)

    // В самом начале срабатывает фунция verstka() для отображения всех ячеек с информацией из базы данных,
    // затем сразу же срабатывает фунция в которой мы и находимся (screenTable()), эта фунция смотрит сколько
    // полных ячеек поместиться на экран определенного размера, все что выходит за размер видимой высоты экрана
    // (переменная "screenHeight") удаляется. 
    

    // ПОДГОНКА ЯЧЕЕК В ЭКРАН
    var rows = document.getElementsByClassName("info"); // Берем все ячейки
    for (let i = 0; i < rows.length; i++) { // Через цикл for проходимся по ячейкам
        var element = rows[i]; // Для удобства заношу ячейку в переменную
        sumHeight = sumHeight + element.offsetHeight; // Считаем сумму высоты, которую занимают ячейки
        if(sumHeight>screenHeight){ // Проверка на выход ячеек из видимой высоты экрана
            document.getElementById('table').style.height = screenHeight+"px"; // Задаем точный размер таблицы, чтобы ячейки занимали всю область
            sumHeight = headers[1].offsetHeight + headers[0].offsetHeight; // Сбрасываем сумму длины ячеек
            break; // Выход из цикла for
        }
        screenRows = screenRows + element.outerHTML; // Добавляем HTML код ячеек для дальнейшего показа на экране
        quantity = i+1; // Сколько ячеек показалось на экране
        quantityRowsOnScreen = i+1; // Именно столько и поместилось на экран    
    }
    
    // ПЕРЕЛИСТЫВАНИЕ 
    if(rows.length>(quantity)){
        setTimeout(function() {
            screenRows= nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen)[1];
            quantity= nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen)[0]

            if(rows.length>(quantity)){
                setTimeout(function () {
                    screenRows= nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen)[1];
                    quantity= nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen)[0];
                    if(rows.length>(quantity)){
                setTimeout(function () {
                    screenRows= nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen)[1];
                    quantity= nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen)[0];
                    if(rows.length==(quantity)){  
                        setTimeout(function () {
                            verstka();
                            screenTable()}, 5000);
                    }document.getElementById('tableElements').innerHTML = screenRows
                    }
                    , 5000);
                }
                    if(rows.length==(quantity)){  
                        setTimeout(function () {
                            verstka();
                            screenTable()}, 5000);
                    }document.getElementById('tableElements').innerHTML = screenRows
                    }
                    , 5000);
                }

            if(rows.length==(quantity)){  
                setTimeout(function () {
                    verstka();
                    screenTable()}, 5000);
                }

            document.getElementById('tableElements').innerHTML = screenRows}, 5000);
        };
        document.getElementById('tableElements').innerHTML = screenRows;
}

function nextRows(rows, sumHeight, screenHeight, quantity, quantityRowsOnScreen){
    verstka();
    var screenRows = "";
        var remainder = quantity
        if(rows.length-quantity<=quantityRowsOnScreen){
            remainder = rows.length-quantityRowsOnScreen
        }
        for (let i = remainder; i < rows.length; i++) {
            var element = rows[i];
            sumHeight = sumHeight + element.offsetHeight;
            if(sumHeight>screenHeight){
                document.getElementById('table').style.height = screenHeight+"px";
                break;
            }
            screenRows = screenRows + element.outerHTML;
            quantity = i+1; 
            
        }
        return [quantity, screenRows];
}

function verstka(){
    document.getElementById('tableElements').innerHTML = `
        <tr class="info">
                <td>A. TAŠKIN</td>
                <td>1</td>
                <td>DERMATOVENEROLOOG</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td></td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>2</td>
                <td>PEREKONDLIKU NÕUSTAMINE ARST</td>
                <td colspan="5">EELNEVAL KOKKULAPPEL</td>
            </tr>
            <tr class="info">
                <td>PROTSEDUURI KABINET</td>
                <td>3</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td></td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>4</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-12:30 15:00-17:30</td>
                <td>10:00-17:30</td>
                <td></td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>5</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td></td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>6</td>
                <td>PSÜHHIAATER</td>
                <td colspan="5">VASTUVÕTTU EI TOIMU</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>7</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>8</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>9</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>10</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>11</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>12</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>13</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>14</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
            <tr class="info">
                <td>A. TAŠKIN</td>
                <td>15</td>
                <td>PSÜHHIAATER</td>
                <td>10:00-17:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30</td>
                <td>10:00-17:30</td>
                <td>08:00-15:30 08:00-15:30</td>
            </tr>
        `;
    }

document.addEventListener("DOMContentLoaded", function(){
    verstka();
    screenTable();
});
