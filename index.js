const express =require('express');
const path =require('path'); //inbuilt module
const port=8088;
                        // __dirname gives path
const db = require('./config/mongoose'); 
const Contact= require('./models/contact');


const app = express();

app.set('view engine','ejs'); 
app.set('views',path.join(__dirname,'views')); //instead of c://kl/.... 
app.use(express.urlencoded());  //middle ware encodes request url
app.use(express.static('assets'));

var contactList = [
{
    name:"Shiva",
    phone:"1111111111"
},
{
    name:"Chandra",
    phone:"1234567890"
},
{
    name:"Stone",
    phone:"8797064231"
}
 ]

app.get('/',function(req,res)
{
    //res.send('Cool,it is running!');
   // console.log(req.url); 
/*   return res.render('home',
   {
       title:"Contacts List",
       contacts_list:contactList

   }); */ 
   Contact.find({},function(err,contacts)
   {
       if(err)
       {  console.log('Error in fetching dataa from db');
           return;
       }
       return res.render('home',
      {
       title:"Contacts List",
       contacts_list:contacts
     });
   });
    
});

app.post('/Contact-list',function(req,res)
{  // console.log(req.body);
  /*   contactList.push(
         {
             name:req.body.name,
             phone:req.body.phone
         }
     );  */
     Contact.create({
         name:req.body.name,
         phone:req.body.phone
     }, function(err,newContact)
     {
         if(err)
        {
             console.log('error in Creating Contact');
             return;
        } 

        console.log('*****',newContact);
        return res.redirect('back');

     });
  //   return res.redirect('/');
});  

app.get('/delete-contact',function(req,res)
{ //console.log(req.query);
  
  
 /*   let phone=req.query.phone; 
  let contactIndex = contactList.findIndex(contact =>contact.phone == phone);
  if(contactIndex!=-1)
  {
      contactList.splice(contactIndex,1);
        
  } */ 
 
  //get id from query in the ul
  let id = req.query.id;

  //find the contact in the database using id and delete
  Contact.findByIdAndDelete(id,function(err)
  {
            if(err)
            {
                console.log('error in deleting a data from db');
                return;
            } 

            return res.redirect('/');
  });

 // return res.redirect('/');
});

app.listen(port,function(err){
    if(err)
    console.log('Error in running the server',err);

    console.log('Yup!My Express Server is unning on Port',port);

});
 