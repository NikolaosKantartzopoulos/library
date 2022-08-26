let myLibrary = [];
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info  = function(){
        let r_value;
        this.read? r_value = "read" : r_value = "not read";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${r_value}`
    }
}
function addBookToLibrary() {
  // do stuff here
}
//------------------------------------------------------------------
//			SAMPLE LIBRARY
//------------------------------------------------------------------
let hobbit = new Book("The Hobbit", "Tolkien", 295, true);
let lotr = new Book("LotR", "Tolkien", 500, false);
let kvothe = new Book("Name of the Wind", "P. Rothfuss", 400, true)
let twilight = new Book("Dragons of Autumn Twilight","Tracy Hickman",300,true)
myLibrary = [hobbit,lotr,kvothe,twilight]
//------------------------------------------------------------------
//			DOM
//------------------------------------------------------------------
const table_DOM = document.getElementById('library_table');
const add_book_DOM = document.getElementById('add_new_book_button');
const ui_menu_dom = document.getElementById('ui_menu');
//------------------------------------------------------------------
//			FUNCTIONS
//------------------------------------------------------------------
function addBookToLibrary(){
	let form_div = document.createElement('form');
	form_div.style = "display:grid; grid-template-columns: 5rem 1fr 5rem 1fr;";
	add_new_field(form_div, "title","Title: ")
	add_new_field(form_div, "author","Author: ")	
	add_new_field(form_div, "pages","Pages: ")
	add_checkbox(form_div, "read", "Read: ")
	add_book_DOM.insertAdjacentElement('afterend',form_div);
	form_div.appendChild(add_submit_button());
}
//------------------------------------------------------------------
//			HELPER FUNCTIONS
//------------------------------------------------------------------

function add_checkbox (form_div, inp_field, label_text){
	let inp_part = create_checkbox_input_field(inp_field);
	let label_part = create_label_field(inp_field, label_text);
	form_div.appendChild(label_part);
	form_div.appendChild(inp_part);
}//todo
function add_new_field (form_div, inp_field, label_text){
	let inp_part = create_text_input_field(inp_field);
	let label_part = create_label_field(inp_field, label_text);
	form_div.appendChild(label_part);
	form_div.appendChild(inp_part);
}
function add_submit_button(){
	let submit_new_book_button = document.createElement('button')
	submit_new_book_button.setAttribute("type", "submit");
	submit_new_book_button.setAttribute("value", "Submit");
	submit_new_book_button.innerHTML = "Submit";
	submit_new_book_button.styles = "grid-column: 1/3"
	return submit_new_book_button;
}
function clear_table (){
	for(let i=0; i < myLibrary.length;i++){
		table_DOM.lastChild.remove();
	}
}
function create_checkbox_input_field(inp_name) {
    var input_field = document.createElement("input");
    input_field.setAttribute("type", "checkbox");
    input_field.setAttribute("name", inp_name);
	input_field.setAttribute("id", inp_name);
	input_field.style = "width: 100px; height 20px; background-color: bisque;"
	return input_field
}
function create_text_input_field(inp_name) {
    var input_field = document.createElement("input");
    input_field.setAttribute("type", "text");
    input_field.setAttribute("name", inp_name);
	input_field.setAttribute("id", inp_name);
	input_field.style = "width: 100px; height 20px; background-color: bisque;"
	return input_field
}
function create_label_field(for_input, new_label_text) {
    var new_label = document.createElement("label");
    new_label.setAttribute("for", `${for_input}`);
	new_label.textContent = new_label_text;
	return new_label
}
function fill_row(i, inp_row){
		for(let j=0;j<4;j++){
		let new_td = document.createElement('td');
		new_td.style.backgroundColor = "skyblue";
		if(j==0){new_td.textContent = myLibrary[i].title;};
		if(j==1){new_td.textContent = myLibrary[i].author;};
		if(j==2){new_td.textContent = myLibrary[i].pages};
		if(j==3){if(myLibrary[i].read) {
				new_td.style.backgroundColor = "green"; 
				new_td.textContent = "Read!"
			} else {
				new_td.style.backgroundColor = "orange"; 
				new_td.textContent = "Not yet"}}
		new_td.addEventListener("click",()=>{
			if(new_td.style.backgroundColor == "green")	{
						new_td.style.backgroundColor = "orange"	//if read
						new_td.textContent = "Not Yet"
						myLibrary[i].read = false
						console.log(`${myLibrary[i].title} changed to ${myLibrary[i].read}` )
						clear_table();
						refresh_table()
					} else {
						new_td.style.backgroundColor = "green"
						new_td.textContent = "Read"
						myLibrary[i].read = true
						console.log(`${myLibrary[i].title} changed to ${myLibrary[i].read}` )
						clear_table();
						refresh_table()
					}
				})	
		inp_row.appendChild(new_td);
		}
	return inp_row
}
function refresh_table() {

	for(let i=0;i<myLibrary.length;i++){
	let new_row = document.createElement('tr');
	new_row = fill_row(i, new_row);
	let last_row = table_DOM.lastChild;
	table_DOM.appendChild(new_row);
	}

}
//------------------------------------------------------------------
//			SETUP
//------------------------------------------------------------------
refresh_table();
add_book_DOM.addEventListener("click",addBookToLibrary)

