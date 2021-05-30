//console.log(firebase);



let myownLibrary =[];
    
//window.onload = initLibrary();

let bookCount = 0;

let contentArea = document.querySelector(".content");
let bookTileTemplate = document.querySelector(".bookTile");
document.querySelector('#templatetile').remove();


let Book = function(  name, author, pages, readStatus){
    // this.cover = cover;
    this. name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;

    // function info(){
    //     return this.name+' by '+ this.author+', '+this.pages+' pages, '+ this.readStatus;
    // }
}



let addBookToLibrary = function(){
    //console.log('add');
    //console.log(myLibrary.length);
    // let bcover = document.querySelector('#bookcover');
    let bname = document.querySelector('#bookname');
    let bauthor = document.querySelector('#bookauthor');
    let bpages = document.querySelector('#bookpages');
    let bread = document.querySelector('#bookread');

    // console.log(bread.checked);

    if(!( bname.value==='' || bauthor.value==='' || bpages.value==='')){
    
    let book = new Book(bname.value,bauthor.value,bpages.value,bread.checked);

    //console.log({book});

    myownLibrary.push(book);

    createandappendbooktile(book);
    }
    else{
        alert("Enter all Information correctly");
    }

    // bcover.value='';
    bname.value = '';
    bauthor.value='';
    bpages.value ='';
    bread.checked = false;


    
};

GridSetup();

function GridSetup(){
    
    

    //console.table(myLibrary);
    // contentArea.innerHTML=''

    // let firtTile = bookTileTemplate.cloneNode();
    // firtTile.innerHTML = "<img class='cover' src='name'>";
    
    //contentArea.append(firtTile);

    myownLibrary.forEach(i=>{

        // console.log({i});
            
        createandappendbooktile(i);
        //console.log({newBookTile});

        });

    }

    function createandappendbooktile(i){

        let newBookTile = bookTileTemplate.cloneNode(true);
        let id = 'book'+bookCount++;
        // let cover = newBookTile.querySelector('.cover');
       // let bookinfo = newBookTile.querySelector('.bookinfo');

        // let cImage = document.createElement('img');
        // cover.innerHTML='';
        // cImage.setAttribute('src',i.cover);
        // cover.append(cImage);
        //cover.append('<img src="'+i.cover+'">');

        let tap = document.createElement('div');
        tap.setAttribute('class','tap');
        let s = '<span class="bookname">'+i.name+'</span>, by '+i.author+', '+i.pages+' pages';
        // if(s.length > 25){
        //    s = s.slice(0,20);
        //    s+= '...'
        // }

        tap.innerHTML = s;


        let rs = document.createElement('div');
        rs.setAttribute('class','readstatus');

        if(i.readStatus){
        rs.innerHTML = 'Read';
        }else{
            rs.innerHTML = 'Unread';
        }

        let bdelete = document.createElement('div');
        bdelete.setAttribute('id',id);
        bdelete.setAttribute('class','deletebook');
        //bdelete.setAttribute('onClick','removeTile()');
        bdelete.addEventListener('click',removeTile);
        bdelete.innerHTML='Delete';
        // bookinfo.innerHTML='';
        // bookinfo.append(tap);
        // bookinfo.append(rs);

        // newBookTile.append(cover);
        // newBookTile.append(bookinfo);
        newBookTile.append(tap);
        newBookTile.append(rs);
        newBookTile.append(bdelete);

        
        newBookTile.setAttribute('id',id);
        //newBookTile.addEventListener('click',removeTile);
        contentArea.append(newBookTile);
      
    }


    function removeTile(event){

        let id = event.currentTarget.id;
        console.log({id});

        let book = document.querySelector('#'+id);
        let bname = book.querySelector('.bookname').innerHTML;
        console.log({bname});

        book.remove();

        myownLibrary.filter((i,index) => {
            if((i.name) === bname){
                //console.log({index});
                myownLibrary.splice(index,1);
                //return index;
            }
        });

        
        //let index = id[4];
        // let index = 
        // console.table(myLibrary);
        
    }

    function savecloud(){
        try{
        firebase.database().ref().child('mylibrary').set(myownLibrary);
        alert("Save Succesful");
        }catch(error){
              alert(json.stringify(error));  
        }
    }

    function savelocal(){

        try {
            
            window.localStorage.setItem('myLibrary',JSON.stringify(myownLibrary));
            alert('Save Successful');
        } catch (error) {
            alert('Unable to save to local device');
        }
    }

    function loadlocal(){
        try {
    
            myownLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));
            console.table(myownLibrary);
            GridSetup();
                
            } catch (error) {
                alert('Unable to load from local device');       
        }
        initLibrary();
    }
    
    async function loadfromcloud(){
        let snap = await firebase.database().ref().child('mylibrary').get();
            let books = snap.val();
            books.forEach( book=> {
                console.log({book});
                let z = new Book(book.name,book.author,book.pages,book.readStatus);
                console.log({z});
                mypush(z)});

                console.table(myownLibrary);
                GridSetup();
        }
        
        
        function mypush(book){
            myownLibrary.push(book);

    }
    

