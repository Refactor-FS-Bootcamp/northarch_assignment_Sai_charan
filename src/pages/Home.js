import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState();
    let [search,setSearch]=useState("")

  const getData = async () => {
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/42d6f014-760d-4bfc-8cd5-282a3f988a89?_format=index"
      );
      const data = await res.json();
      setData(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDate=(date)=>{
    const newDate=new Date(date)
        var dd = newDate.getDate();
        var mm = newDate.getMonth();
        var yyyy = newDate.getFullYear();

        var newDat = dd+'-'+mm+'-'+yyyy;

        //return today;   
    
    return `${newDate.toLocaleTimeString('en-US')}     ${newDat}`

  }

  const handleDelete = async (rowIndex) => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/42d6f014-760d-4bfc-8cd5-282a3f988a89/${rowIndex}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        const updatedData = data.filter((_, i) => i !== rowIndex);
        setData(updatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const settingSearch=(e)=>{
    setTimeout(()=>{setSearch(e.target.value)},1000)
    console.log(search)
  }
  return (
    <div className="accordion" id="accordionExample">
        <h2 style={{textAlign:'center'}}>User Data</h2>
       
{/* <input type="text" id="myInput" onChange={(e)=>settingSearch(e)} placeholder="Search for names.." title="Type in a name" 

/> */}



<div class="main">
  
  
  

  <div class="input-group">
    <input type="text" class="form-control" placeholder="Search emails" onChange={(e)=>settingSearch(e)}/>
    <div class="input-group-append">
      <button class="btn btn-secondary" type="button">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</div>


<div class="container mt-5">
<div class="d-flex justify-content-center row">
<div class="col-md-10">
<div class="rounded">
<div class="table-responsive table-borderless">
<table class="table">
<thead>
<tr>
<th class="text-center">S.No.</th>
<th>Name</th>
<th>Email</th>
<th>Message</th>
<th>Date</th>
<th>Edit</th>
<th>Delete</th>
<th></th>
</tr>
</thead>
<tbody class="table-body">
    {search!==""?data.map((item,i)=>{
        if(item.email.includes(search)){
            return <>
            {console.log(item)}
<tr class="cell-1" data-toggle="collapse" data-target="#demo">
<td class="text-center">{i+1}</td>
<td class="name-row">{item.name}</td>
<td>{item.email}</td>
<td class="message-row">{item.message}</td>
<td>{item.date}</td>
<td><Link to={`/edit/${i}`} style={{ textDecoration: "none" }}>Edit</Link></td>
<td><button className="btn btn-sm btn-danger ms-1" onClick={() => handleDelete(i)}>X</button></td>
<td class="table-elipse" data-toggle="collapse" data-target="#demo"></td>

</tr>
<tr  class="collapse cell-1 row-child demo">
<td class="text-center" colspan="1"><i class="fa fa-angle-up"></i></td>
<td colspan="1">Product&nbsp;</td>
<td colspan="3">iphone SX with ratina display</td>
<td colspan="1">QTY</td>
<td colspan="2">2</td>
</tr>

            </>
          }
    }):(data?.map((item, i) => (
   
    <>
<tr class="cell-1" data-toggle="collapse" data-target="#demo">
<td class="text-center">{i+1}</td>
<td class="name-row">{item.name}</td>
<td>{item.email}</td>
<td class="message-row">{item.message}</td>
<td>{handleDate(item.date)}</td>
<td><Link to={`/edit/${i}`} style={{ textDecoration: "none" }}>Edit</Link></td>
<td><button className="btn btn-sm btn-danger ms-1" onClick={() => handleDelete(i)}>X</button></td>
<td class="table-elipse" data-toggle="collapse" data-target="#demo"></td>
</tr>
<tr  class="collapse cell-1 row-child demo">
<td class="text-center" colspan="1"><i class="fa fa-angle-up"></i></td>
<td colspan="1">Product&nbsp;</td>
<td colspan="3">iphone SX with ratina display</td>
<td colspan="1">QTY</td>
<td colspan="2">2</td>
</tr>
    </>
   ) ))}
     </tbody>
     </table>
     </div>
     </div>
     </div>
     </div>
     </div>

  </div>
  )
}
