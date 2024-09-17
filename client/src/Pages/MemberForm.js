import React from "react"
import { useState} from "react"
import { useNavigate } from "react-router-dom"

const MemberForm = ({ addMember }) => {
  const [memberForm, setMemberForm] = useState({
    Id: "",
    MemberName: "",
    Password: ""
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const newMember = {
      ...memberForm,
      [event.target.name]: event.target.value
    };
    setMemberForm(newMember);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    fetch("http://localhost:5555/members", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-Type": "application/json"
      },
      body: JSON.stringify(memberForm)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(addedMember => {
        addMember(addedMember);
        navigate("/Members");
      })
      .catch(error => console.error('Error adding Member:', error));
  }

  return (
    <div className="new-member-form">
      <h2>Create Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="preferred">
          <label className="large-label" htmlFor="MemberName">MemberName: </label>
          <input
            type="text"
            name="MemberName"
            id="MemberName"
            value={memberForm.MemberName} // Corrected here
            onChange={handleChange}
            required
          />
        </div><br />
        <div className="preferred">
          <label className="large-label" htmlFor="Password">Password: </label>
          <input
            type="text"
            name="Password"
            id="Password"
            value={memberForm.Password} // Corrected here
            onChange={handleChange}
            required
          />
        </div><br />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default MemberForm