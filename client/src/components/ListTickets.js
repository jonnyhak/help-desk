import React, {useEffect, useState} from 'react';
import EditTicket from './EditTicket';
import { Link } from 'react-router-dom';

function ListTickets() {
    const [tickets, setTickets] = useState([]);
    const [searchText, setSearchText] = useState("");

    //delete ticket function

    const deleteTicket = async id => {
        try {
        //   const deleteTicket = await fetch(`http://localhost:5000/tickets/${id}`, {
          const deleteTicket = await fetch(`/tickets/${id}`, {
        //   const deleteTicket = await fetch(`https://pern-helpdesk-f52ef804084b.herokuapp.com/tickets/${id}`, {
            method: "DELETE"
          });
    
          setTickets(tickets.filter(ticket => ticket.ticket_id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

    const getTickets = async () => {
        try {
        //    const response = await fetch("http://localhost:5000/tickets")
           const response = await fetch("/tickets")
        //    const response = await fetch("https://pern-helpdesk-f52ef804084b.herokuapp.com/tickets")
           const jsonData = await response.json()
           
           setTickets(jsonData)

        } catch (err) {
            console.error(err.message)
        }
    }

    const changeSearchText = (e) => {
        // let inputText = e.target.value.toLowerCase()
        setSearchText(e.target.value.toLowerCase())
    }
    
    const filteredTickets = tickets.filter((ticket) => {
        return (
            ticket.username.toLowerCase().includes(searchText) ||
            ticket.email.toLowerCase().includes(searchText) ||
            ticket.description.toLowerCase().includes(searchText) ||
            ticket.status.toLowerCase().includes(searchText) 
        )
    })

    useEffect(() => {
        getTickets();
    }, []);
    
    return (
    <>
        <Link to="/">Home</Link>
        <h1 className='text-center mt-2'>Tickets List</h1>
        <br />
        <input 
            type="text" 
            placeholder='search tickets...'
            value={searchText}
            onChange={changeSearchText}
        />
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {filteredTickets.map(ticket => (
                    <tr key={ticket.ticket_id}>
                        <td>{ticket.ticket_id}</td>
                        <td>{ticket.username}</td>
                        <td>{ticket.email}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.status}</td>
                        <td>
                            <EditTicket ticket={ticket}/>
                        </td>
                        <td>
                            <button onClick={() => deleteTicket(ticket.ticket_id)} className='btn btn-danger'>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default ListTickets