window.onload=main;

        //creates arrays to hold the values input and created
        var oldArray=[];
        var convertedArray=[];
        var baseArray=[];
        
        
        
        
        //opens on page loading
        function main()
        {
            //creates variables to hold the elements of buttons
            var convertElement=document.getElementById("convertButton");
            var historyElement=document.getElementById("historyButton");
            
            //calls functions based on button presses
            convertElement.onclick=displayValues;
            historyElement.onclick=displayHistory;
        }
        
        
    
    
        //displays value based on radio button and input
        function displayValues()
        {
            //clears the innerHTML of "history" paragraph
            document.getElementById("history").innerHTML="";
            //creates variables to hold number values
            var newBase, selection, outputThing;
            //gets element from clicking the convert button
            var nameElement=document.getElementsByName("convert");
            
            //runs through the radio buttons to find which one is checked
            for(var x=0;x<nameElement.length;x++)
            {
                if(nameElement[x].checked)
                {
                    selection=x;
                }
            }
            
            //selects which base to use based based on the selected radio button
            switch (selection)
            {
                case 0:
                    newBase=2;   
                break;
                case 1:
                    newBase=8;
                break;
                case 2:
                    newBase=16;
                break;
            }
        
            //gets the value from the input box
            var inputElement=document.getElementById("inputBox");
            var number=inputElement.value;
            
            //calls baseConversion function to get new number
            outputThing=baseConversion(number, newBase);
            
            //places the new number in the output box
            document.getElementById("outputBox").value=outputThing;
        }
        
        
        
        
        //displays the history of conversions
        function displayHistory()
        {
            //variable to hold the name of the base conversion
            var baseName="";
            //gets element from history paragraph
            var history=document.getElementById("history");
            
            //goes through the array to print out the history 
            for(var x=0;x<baseArray.length;x++)
            {
                //checks if the element is 0, which means there is a new history line to display
                if (baseArray[x]!=0)
                {
                        //prints out line breaks if not the first element
                        if (x>0)
                        {
                               history.innerHTML+="</br></br>"; 
                        }
                    //selects the base name to display based on element in array
                    switch(baseArray[x])
                    {
                        case 2:
                            baseName="Binary";
                        break;
                        
                        case 8:
                            baseName="Octal";
                        break;
                    
                        case 16:
                            baseName="Hexadecimal";
                        break;
                    }
                        //adds base name and input number into the history paragraph section
                        history.innerHTML+= baseName+": "+oldArray[x]+"-------->";
                }
                //adds the new value to the history paragraph section
                history.innerHTML+= convertedArray[x];
            }
        }
    
        
        
        
        //converts the original number to a new base
        function baseConversion(number, newBase)
        {
            //variables to convert into new number
            var digit,converted="",reversedConverted="";
            var tempArray=[];
            
            //adds number to front of the original number history array
            oldArray.push(number);
            //adds the base to the front of the base name history array
            baseArray.push(newBase);
            //checks if the input is a number
            if (number<0||isNaN(number))
            {
                //displays invalid if NaN
                converted+="dilavnI";
            }

            //displays 0 if 0
            else if (number==0)
            {
                converted+="0";
                tempArray.unshift(0);
                oldArray.push(0);
                baseArray.push(0);
            }
        
            else{
            //runs while the remainder is greater than 0
            while (number>0)
            {
                //gets the remainder of dividing number by the base
                digit=number%newBase;
                //changes number to letter is digit>9
                if (digit>9)
                {
                    switch(digit)
                    {
                        case 10:
                            digit="A";
                        break;
                    
                        case 11:
                            digit="B";
                        break;
                    
                        case 12:
                            digit="C";
                        break;
                    
                        case 13:
                            digit="D";
                        break;
                    
                        case 14:
                            digit="E";
                        break;
                    
                        case 15:
                            digit="F";
                    }
                }
                //adds digit to string of new number
                converted+=digit;
                //adds digit to end of temporary array
                tempArray.unshift(digit);
                //makes new number from dividing by base
                number=number/newBase;
                //pushes number down to make it whole
                number=Math.floor(number);
                //adds a 0 at front of old and base arrays to be a placeholder
                oldArray.push(0);
                baseArray.push(0);    
            }
            }
            //removes first element of old and base arrays to make them the right length
            oldArray.pop();
            baseArray.pop();
            //adds temporary array to the whole converted array
            addToArray(convertedArray,tempArray);
            //reverses the converted string to be print out
            reversedConverted=reverseString(converted);
            //returns the converted string
            return reversedConverted;
        }
        
        
        
        
        //reverses the string created in base conversion
        function reverseString(converted)
        {
            //creates variable to reversed string
            var reversedConverted="";
            //adds items to the reversed string
            for(var i=converted.length-1;i>=0;i--)
            {
                reversedConverted+=converted.charAt(i);
            }
            
            //returns the reversed string
            return reversedConverted;
        }
        
        
        
        
        //adds the temporary array from base conversion to the master converted array
        function addToArray(convertedArray, tempArray)
        {
            //goes through all elements of the temp array and adds to the master converted array
            for(var x=0; x<tempArray.length;x++)
            {
                convertedArray.push(tempArray[x]);
            }
        }