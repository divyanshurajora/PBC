const $ = require('jquery');
const fs = require("fs");
const dialog = require("electron").remote.dialog;

$(document).ready(function(){

    let data = [];
    let lsc;     //lsc -> last selected cell

    $(".menu").on("click", function () {
        let Id = $(this).attr("id");
        // File
        $(".menu-options").removeClass("selected");
        $(`#${Id}-menu-options`).addClass("selected");
    })
    
    let lcell;
    $('#grid .cell').on('click', function(){

        //let rid = parseInt($(this).attr('row-id'));
        //let cid = parseInt($(this).attr('col-id'));
        let{rowId, colId} = getrc(this);
        let cellObject = data[rowId][colId];
        
        let value = String.fromCharCode(colId + 65) + (rowId + 1);
        $('#address-input').val(value);
        //    set cell formula 
        if (lcell && this != lcell) {
            $(lcell).removeClass("selected");
        }           
        $(this).addClass("selected");

        if (cellObject.bold) {
            $("#bold").addClass("isOn")
        } else {
            $("#bold").removeClass("isOn")
        }
        lcell = this;

    })

    //on clicking bold button
    $("#bold").on("click", function () {
        $(this).toggleClass("isOn");
        let isBold = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("font-weight", isBold ? "bolder" : "normal");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getcell(cellElem);
        cellObject.bold = isBold;
    })
    $("#underline").on("click", function () {
        $(this).toggleClass("isOn");
        let isUnderline = $(this).hasClass("isOn");
        $("#grid .cell.selected").css("text-decoration", isUnderline ? "underline" : "normal");
        let cellElem = $("#grid .cell.selected");
        let cellObject = getcell(cellElem);
        cellObject.underline = isUnderline;
    })
    // to change fonts
    $("#font-family").on("change", function () {
        let fontFamily = $(this).val();
        $("#grid .cell.selected").css("font-family", fontFamily);
        let cellElem = $("#grid .cell.selected");
        let cellObject = getcell(cellElem);
        cellObject.fontFamily = fontFamily
    })

    //to change background colour
    $("#bg-color").on("change", function () {
        let bgColor = $(this).val();
        let cellElem = $("#grid .cell.selected");
        cellElem.css("background-color", bgColor);
        let cellObject = getcell(cellElem);
        cellObject.bgColor = bgColor
    })

    // for scrolling top row and left col with grid scrolling
    $(".cell-container").on("scroll",function(){
        let scrollY = $(this).scrollTop();
        let scrollX = $(this).scrollLeft();
        $("#top-row,#top-left-cell").css("top",scrollY + "px");
        $("#top-left-cell,#left-col").css("left",scrollX + "px");
    })
    //to increase the height of the rows with the size of the text 
    $("#grid .cell").on("keyup", function(){
        console.log("Key up event");
        let {rowId} = getrc(this);
        let ht = $(this).height();
        console.log(ht);
        $($("#left-col .cell")[rowId]).height(ht);
    })

    $("#New").on("click", function () {
        data = [];
         let Allrows = $('#grid').find(".row");
         for(let i=0; i<Allrows.length; i++){

             let row = [];
             let Allcols = $(Allrows[i]).find(".cell");
             for(let j=0; j<Allcols.length; j++){
                 let cell ={
                     value: "",
                     formula: "",
                     upstream: [],
                     downstream: [],
                     bold: false,
                     underline: false,
                     italic: false,
                     fontFamily: "Arial",
                     fontSize: 12,
                     bgColor: "white",
                     textColor: "black",
                     halign: "left"
                 }   

                 $(Allcols[j]).html('');
                 $(Allcols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                 $(Allcols[j]).css("font-style", cell.italic ? "italic" : "normal");
                 $(Allcols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                 $(Allcols[j]).css("font-family", cell.fontFamily);
                 $(Allcols[j]).css("font-size", cell.fontSize);
                 $(Allcols[j]).css("color", cell.textColor);
                 $(Allcols[j]).css("background-color", cell.bgColor);
                 $(Allcols[j]).css("text-align", cell.halign);

                 //$(this).html('');
                 row.push(cell);

             }
             data.push(row);
         }
         console.log(data);
        // $("#grid .cell").eq(0).trigger("click");
        let cellArr = $("#grid .cell");
        $(cellArr[0]).trigger("click");
    })

    $("#Save").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if (fp == undefined) {
            console.log("Please select file first");
            return;
        }
        let jsonData = JSON.stringify(data);
        fs.writeFileSync(fp, jsonData);
        // open dialogBox
        // select file
        // write 
        // Input=> file
    })

    $("#Open").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if (fp == undefined) {
            console.log("Please select file first");
            return;
        }
        let buffer = fs.readFileSync(fp);
        data = JSON.parse(buffer);
        let AllRows = $("#grid").find(".row");
        for (let i = 0; i < AllRows.length; i++) {
            let AllCols = $(AllRows[i]).find(".cell");
            for (let j = 0; j < AllCols.length; j++) {
                //    DB
                //$(`#grid .cell[row-id=${i}][col-id=${j}]`).html(data[i][j].value);
                let cell = db[i][j];
                $(AllCols[j]).html(cell.value);
                $(AllCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                $(AllCols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(AllCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(AllCols[j]).css("font-family", cell.fontFamily);
                $(AllCols[j]).css("font-size", cell.fontSize);
                $(AllCols[j]).css("color", cell.textColor);
                $(AllCols[j]).css("background-color", cell.bgColor);
                $(AllCols[j]).css("text-align", cell.halign);
            }
        }
    })

    $("#grid .cell").on("blur", function(){
        //let rid = parseInt($(this).attr('row-id'));
        //let cid = parseInt($(this).attr('col-id'));
        let{rowId, colId} = getrc(this);
        let cellObject = getcell(this);
        
        if (cellObject.value == $(this).html()) {
            lsc=this;
            return;
        }

        if (cellObject.formula) {
            deleteformula(cellObject, this);
        }
        //data[rid][cid].value = $(this).text();
        cellObject.value = $(this).text();
        updateCell(rowId, colId, cellObject.value);
        //console.log(data);
        lsc = this;
    })

    

    $("#formula-input").on("blur", function(){
        let cellObj = getcell(lsc);
        if(cellObj.formula == $(this).val()){
            return;
        }
        let {rowId, colId} = getrc(lsc);
        
        if(cellObj.formula){
            deleteformula(cellObj, lsc);
        } 
        cellObj.formula = $(this).val();
        addformula(lsc, cellObj.formula);
        let nVal = evaluate(cellObj);
        console.log(nVal);
        updateCell(rowId, colId, nVal);
    })

    function evaluate(cellObj) {
        //     upstream => go to your upstream=> get their values
        // ( A1 + A11 + A1 )= [ (,A1,+,A11,+,A1,)]=> [(,10,+,A11,+,10,)]=> ( 10 + A11 + 10 )
        // ( 10 + 20 )
        // Js => eval 
        let formula = cellObj.formula;
        console.log(formula);
        for (let i = 0; i < cellObj.upstream.length; i++) {
            let cuso = cellObj.upstream[i];
            // rId,CId => A1
            let colAddress = String.fromCharCode(cuso.colId + 65);
            let cellAddress = colAddress + (cuso.rowId + 1);
            let fusokiVal = data[cuso.rowId][cuso.colId].value;
            let formulCompArr = formula.split(" ");
            formulCompArr = formulCompArr.map(function (elem) {
                if (elem == cellAddress) {
                    return fusokiVal;
                } else {
                    return elem;
                }
            })
            formula = formulCompArr.join(" ");
        }

        console.log(formula);
        // infix evaluation
        return eval(formula);
    }

    function addformula(cellElem, formula){
        //(A1+A2)
        formula = formula.replace("(", "").replace(")", "");   //A1+A2 
        let formulacomponent = formula.split(" ");   //[A1,+,A2]
        for(let i=0; i<formulacomponent.length; i++){
            let charAt0 = formulacomponent[i].charCodeAt(0);
            if(charAt0>64 && charAt0<91){
                let {r, c} = getparentRowcol(formulacomponent[i], charAt0);
                let parentcell = data[r][c];
                let {rowId, colId} = getrc(cellElem);
                let cell = getcell(cellElem);
                //add yourself to downstream of your parent
                parentcell.downstream.push({
                    rowId: rowId,
                    colId: colId
                })
                //add parent in your upstream
                cell.upstream.push({
                    rowId: r,
                    colId: c
                })
            }
        }
    }

    function deleteformula(cellObject, cellElem){
        cellObject.formula = "";
        let {rowId,colId} = getrc(cellElem);
        for(let i=0; i<cellObject.upstream.length; i++){
            let uso = cellObject.upstream[i];  //uso -> upstream object
            let fuso = data[uso.rowId][uso.colId];  //fuso -> full upstream object
            //find index remove yourself
            let fArr = fuso.downstream.filter(function(dcell){
                return dcell.rowId != rowId && dcell.colId != colId
            })
            fuso.downstream = fArr;
        }
        cellObject.upstream = [];
    }

    function updateCell(rowId, colId, nVal) {
        let cellObject = data[rowId][colId];
        cellObject.value = nVal;
        // update ui 


        $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(nVal);

        for (let i = 0; i < cellObject.downstream.length; i++) {
            let dsocordObj = cellObject.downstream[i];
            let dso = data[dsocordObj.rowId][dsocordObj.colId];
            let dsonVal = evaluate(dso);
            updateCell(dsocordObj.rowId, dsocordObj.colId, dsonVal);
        }

    }

    function getparentRowcol(cellName, charAt0){
        // cellName -> A1
        let sArr = cellName.split("");  //[A,1]
        //suppose cell is A25
        //so the split will do -> [A,2,5]
        sArr.shift();  // [2,5]
        sRow = sArr.join(""); //25
        let r = Number(sRow) - 1;  // - 1 because we have taken number from 1
        let c = charAt0 - 65;     // because charAt0 is in ASCII
        return {r,c};
    }

    function getrc(elem){
        let rowId = parseInt($(elem).attr('row-id'));
        let colId = parseInt($(elem).attr('col-id'));
        return{
            rowId, colId
        }
    }

    function getcell(CellElem){
        let {rowId,colId} = getrc(CellElem);
        return data[rowId][colId];
    }

    function init(){
        $("#File").trigger("click");
        $("#New").trigger("click");
    //     data = [];
    //     let Allrows = $('#grid').find(".row");
    //     for(let i=0; i<Allrows.length; i++){

    //         let row = [];
    //         let Allcols = $(Allrows[i]).find(".cell");
    //         for(let j=0; j<Allcols.length; j++){
    //             let cell ={
    //                 value: "",
    //                 formula: "",
    //                 upstream: [],
    //                 downstream: []
    //             }

    //             //$(this).html('');
    //             row.push(cell);

    //         }
    //         data.push(row);
    //     }
    //     console.log(data);
    }

    init();
})