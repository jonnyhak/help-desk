import React, {useState} from 'react'
import { Link } from 'react-router-dom';

function InputTicket() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("new"); //new tickets will default to a status of 'new'
    const [reply, setReply] = useState(""); //new tickets will default to a reply of ""

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {description, email, userName, status, reply};
            const response = await fetch("http://localhost:5000/tickets", {
            // const response = await fetch("/tickets", {
            // const response = await fetch("https://pern-helpdesk-f52ef804084b.herokuapp.com/tickets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }
  
    return (
    <>
        <Link to="/ticketsList">Ticket List</Link>
        <h1 className='text-center mt-2'>Create Ticket</h1>
        <form className='mt-5' onSubmit={onSubmitForm}>
            <input
                type="text" 
                className='form-control' 
                value={userName} 
                onChange={e => setUserName(e.target.value)}
                placeholder='name...'
            />
            <br />
            <input
                required 
                type="email" 
                className='form-control' 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder='email...'
            />
            <br />
            {/* <input 
                type="text" 
                className='form-control' 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder='description...'
            /> */}
            <textarea
                required
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder='description...' 
                className="form-control" 
                cols="30" 
                rows="3"
            ></textarea>
            <br />
            <button className='btn btn-success'>Add</button>
        </form>
    </>
  )
}

export default InputTicket