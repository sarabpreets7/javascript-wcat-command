#!/usr/bin/env node


const fs = require("fs");
let arguments = process.argv.slice(2);

function wcat(arguments){
    var options = arguments.filter(function(data,index){
        return data.startsWith("-");
    });

    var files = arguments.filter(function(data,index){
        return !data.startsWith("-");
    });

    if(files.length==0){
        console.log("please specify a file name");
        return;
    }

    for(let i=0;i<files.length;i++){
        if(!fs.existsSync(files[i])){
            console.log("file does not exist");
            return;
        }
    }
    let numbering =1;
    for(let i=0; i<files.length; i++){
        let data = fs.readFileSync(files[i],"utf-8");
        if(options.includes("-s")){
            let lines = data.split("\r\n");
            console.log(lines);
            for(let j=0;j<lines.length;j++){
                if(lines[j] != ""){
                    if(options.includes("-n")||options.includes("-b")){
                        console.log(numbering+" "+ lines[j])
                        numbering+=1;
                    }
                    else{
                    console.log(lines[j]);
                    }
                }
            }
        }
        else if((options.includes("-n") && !options.includes("-b"))||(options.includes("-n") && options.includes("-b")&& options.indexOf("-b")>options.indexOf("-n"))){
            let lines = data.split("\r\n")
            for(let h=0;h<lines.length;h++){
                console.log(numbering+" "+lines[h])
                numbering+=1;
            }
        }
        else if(options.includes("-b")){
            let lines = data.split("\r\n");
            for(let h=0;h<lines.length;h++){
                if(lines[h]!=""){
                console.log(numbering+" "+lines[h])
                numbering+=1;
                }
                else{
                    console.log(lines[h]);
                }
            }

        }
        else if(options.includes("-w")){
            if(files.length!=2||arguments.indexOf("-w")!=1){
                console.log("unable to run code");
                return;
            }
            else{
                let data = fs.readFileSync(files[0],"utf-8");
                fs.writeFileSync(files[1],data);
                return;

            }
        }
        else if(options.includes("-a")){
            if(files.length!=2||arguments.indexOf("-a")!=1){
                console.log("unable to run code");
                return;
            }
            else{
                let data1 = fs.readFileSync(files[0],"utf-8");
                let data2 = fs.readFileSync(files[1],"utf-8");
                fs.writeFileSync(files[1],data1+data2);
                return;
            }

        }
        else{
            console.log(data);
        }
    }
    
}
wcat(arguments);