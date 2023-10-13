import React from "react";
import React from "react-router-dom";

function NewReservation(){
    const [reservation, setReservation] = setState();
    const handleSubmit = (e) =>{
        e.preventDefault();
        setReservation(e.target.value);
        console.log(e.target.value);
    };
    return(
        <form>
            <label>First Name:</label>
            <input name="first_name" />
            <label>Last Name:</label>
            <input name="first_last" />
            <label>Mobile Number:</label>
            <input name="mobile_number" />
            <label>Reservation Date:</label>
            <input name="reservation_date" />
            <label>Reservation Time:</label>
            <input name="reservation_time" />
            <label>Number of People:</label>
            <input name="people" />
            <button type="Submit"> Submit</button>
        </form>
    );
}

export default NewReservation;