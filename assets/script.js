//get employee id
const urlParams = new URLSearchParams(window.location.search);
const eid = urlParams.get('eid');
let employees = [];

//fetch employee json file
fetch('assets/employees.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //call below function to match employee id
        matchEid(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });

//this functuin will match employee id and fetch the respective details
const matchEid = (data) => {
    data.employees.map(x => {
        if (x.Employee_No === eid) {
            let img = x.IMAGE;
            let linkedin = x.LINKEDIN;
            let name = x.NAME;
            let phone = x.MOBILE;
            let email = x.EMAIL;
            let department = x.DEPARTMENT;
            let position = x.DESIGNATION;
            showDataOnHtml(linkedin, img, name, phone, email, department, position);
            generateVcardLink(name, phone, email, department, position);
        }
    });
}

//this function will display the fetched data on html
const showDataOnHtml = (linkedin, img, name, phone, email, department, position) => {
    document.title = name; // Change the page title with the employee's name
    document.getElementById("headimage").src = img;
    document.getElementById("headlinkedin").href = linkedin;
    document.getElementById("headtitle").innerHTML = name;
    document.getElementById("headposition").innerHTML = position;
    document.getElementById("headphone").href = `tel:${phone}`;
    document.getElementById("heademail").href = `mailto:${email}`;
    document.getElementById("bodyphone").href = `tel:${phone}`;
    document.getElementById("bodyemail").href = `mailto:${email}`;
    document.getElementById("bodyphone").innerHTML = phone;
    document.getElementById("bodyemail").innerHTML = email;
    document.getElementById("bodyposition").innerHTML = position;
}


//this function will generate the vcard link
const generateVcardLink = (name, phone, email, department, position) => {
    var empCard = vCard.create(vCard.Version.FOUR)
    empCard.add(vCard.Entry.NAME, name)
    empCard.add(vCard.Entry.FORMATTEDNAME, name)
    empCard.add(vCard.Entry.TITLE, position)
    empCard.add(vCard.Entry.PHONE, phone, vCard.Type.CELL)
    empCard.add(vCard.Entry.EMAIL, email, vCard.Type.WORK)
    empCard.add(vCard.Entry.EMAIL, email, vCard.Type.HOME)
    empCard.add(vCard.Entry.ORGANIZATION, "BackOffice LLC")
    empCard.add(vCard.Entry.URL, "https://bo.ge")

    var link = vCard.export(empCard, "Download VCard", name, false) // use parameter true to force download

    document.getElementById("download").appendChild(link);
}