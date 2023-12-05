import React, {useState} from 'react'

function EditTicket({ ticket }) {
    const [status, setStatus] = useState(ticket.status)
    const [reply, setReply] = useState(ticket.reply)

    //edit ticket function

    const updateTicket = async (e) => {
        e.preventDefault();
        try {
            const body = {reply, status};

            //proxy

            // const response = await fetch(`http://localhost:5000/tickets/${ticket.ticket_id}`,{
            const response = await fetch(`/tickets/${ticket.ticket_id}`,{
            // const response = await fetch(`https://pern-helpdesk-f52ef804084b.herokuapp.com/tickets/${ticket.ticket_id}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/tickets"
        } catch (err) {
            console.error(err.message)
        }
    }


    return (
    <>
        <button 
            type="button" 
            className="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${ticket.ticket_id}`}
        >
            Edit
        </button>

        <div className="modal" id={`id${ticket.ticket_id}`} >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Ticket</h4>
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal"
                            onClick={() => setStatus(ticket.status)}
                        >
                            &times;
                        </button>
                    </div>

                    <div className="modal-body">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{ticket.ticket_id}</td>
                                <td>{ticket.username}</td>
                                <td>{ticket.email}</td>
                                <td>{ticket.description}</td>
                            </tr>
                        </tbody>
                    </table>
                        <textarea 
                            placeholder='respond to request...' 
                            className="form-control" 
                            cols="30" 
                            rows="3"
                            value={reply}
                            onChange={e => setReply(e.target.value)}
                        >
                        </textarea>
                        <br />
                        <select 
                            className="form-control"
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="new">new</option>
                            <option value="in progress">in progress</option>
                            <option value="resolved">resolved</option>
                        </select>
                    </div>

                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-warning" 
                            data-dismiss="modal"
                            onClick={e => {
                                if (reply){
                                    window.alert(`Would normally send email here with body: "${reply}"`)
                                    console.log(`Would normally send email here with body: "${reply}"`)   
                                }
                                updateTicket(e)
                            }}
                        >
                            Update
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            data-dismiss="modal"
                            onClick={() => setStatus(ticket.status)}
                        >
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </>
  )
}

export default EditTicket