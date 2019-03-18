
//decrease height & hide form when minimised
const widget = document.querySelector('.widget')
const closeBtn = document.querySelector('.close')
const formWraper = document.querySelector('.form__wraper')
const minimised = document.querySelector('.minimised')
const afterSubmit = document.querySelector('.aftersubmit')

closeBtn.addEventListener('click', ()=>{
	widget.style.height = '55px'
	//widget.style.transform  = 'scaleY(0.1)'
	formWraper.style.display = 'none'
	closeBtn.style.display = 'none'
	minimised.style.display = 'flex'
	afterSubmit.style.display = 'none'
});


//maximized
minimised.addEventListener('click', ()=>{
	widget.style.height = '467px'
	formWraper.style.display = 'block'
	closeBtn.style.display = 'flex'
	minimised.style.display = 'none'
});


//validate input
const inputs = document.querySelectorAll('input')


const patterns = {
	phone: /^\d{6,15}$/,
	username: /^[a-zA-Z]+$/,
	email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
}

function validate(field, regex, error){
	if(regex.test(field,regex) == false){
		error.style.visibility = 'visible'
	}else if(regex.test(field,regex) == true){
		error.style.visibility = 'hidden'
	}
}


//form submission
const form = document.querySelector('form')
const callBtn = document.querySelector('.callbtn')
const err = document.querySelectorAll('.err')
const spinner = document.querySelector('.spinner')

let validateAll = false;

form.addEventListener('submit', (e)=>{
	e.preventDefault();
});

callBtn.addEventListener('click', ()=>{
	for(let i=0; i<inputs.length; i++){
		validate(inputs[i].value, patterns[inputs[i].name], err[i])
	}

	//validate all
	for(let j=0; j<err.length; j++){
		if(err[j].style.visibility == 'visible'){
			validateAll = false;
			break;
		}else{
			validateAll = true;
		}
	}

	if(validateAll){
		formWraper.style.display = 'none'
		spinner.style.display = 'block'
		fetch('https://jsonplaceholder.typicode.com/posts',{
			method: 'POST'
		})
		.then(response => response.json())
		.then(json => {
			spinner.style.display = 'none'
			afterSubmit.style.display = 'block'
		})
	}else{
		spinner.style.display = 'none'
		formWraper.style.display = 'block'
	}
})
