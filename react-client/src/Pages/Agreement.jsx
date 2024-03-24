import React from 'react';

function Agreement() {
  return (
    <div className="Agreement">
      <h2>Car Rental Agreement</h2>
      <form>
        {/* Rental Terms and Conditions */}
        <h3>Rental Agreement Number:</h3>
        <p>This Rental Agreement ("Agreement") is entered into between Vini's Vehicles Inc., located at 1455 Blvd. De Maisonneuve Ouest, Montreal, Quebec H3G 1M8, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":</p>
        <ol>
          <li>
            <h3>Renter's Information:</h3><br/>
            Name:<br/>
            Address:<br/>
            Contact Number:<br/>
            Email Address:<br/>
            Driver's License Number:<br/>
          </li><br/>
          <li>
          <h3>Vehicle Information:</h3><br/>
            Make:<br/>
            Model:<br/>
            Year:<br/>
            License Plate Number:<br/>
            Vehicle Identification Number (VIN):<br/>
            Color:<br/>

          </li><br/>
          <li>
          <h3>Rental Details:</h3><br/>
            Rental Start Date:<br/>
            Rental End Date:<br/>
            Pick-up Location:<br/>
            Drop-off Location:<br/>
            Rental Period:<br/>
            Mileage Limit (if applicable):<br/>
            Rental Rate:<br/>
            Additional Services (if any):<br/>


          </li><br/>
          <li>
            <h3>Rental Terms and Conditions:</h3><br/>
            <ul>
                <li>
                    The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
                </li>
                <li>
                    The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
                </li>
                <li>
                    The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
                </li>
                <li>
                    The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
                </li>
                <li>
                    The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
                </li>
                <li>
                    The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
                </li>
                <li>
                    The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
                </li>
                <li>
                    The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.
                </li>
            </ul>

          </li>
        <li>
        <h3>Indemnification:</h3>
            The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.
        </li>
        <li>
        <h3>Governing Law:</h3>
            This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].
        </li>
        <li>
        <h3>Entire Agreement:</h3>
        This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.
        </li>
        <li>
        <h3>Signatures:</h3>
        <div>
          <label htmlFor="rental_company_signature">Rental Company:</label>
          <input type="text" id="rental_company_signature" name="rental_company_signature" required />
        </div>
        <div>
          <label htmlFor="renter_signature">Renter:</label>
          <input type="text" id="renter_signature" name="renter_signature" required />
        </div>

        <div>
          <label htmlFor="rental_company_name">Print Name (Rental Company):</label>
          <input type="text" id="rental_company_name" name="rental_company_name" required />
        </div>
        <div>
          <label htmlFor="renter_name">Print Name (Renter):</label>
          <input type="text" id="renter_name" name="renter_name" required />
        </div>

        <div>
          <label htmlFor="rental_company_date">Date (Rental Company):</label>
          <input type="date" id="rental_company_date" name="rental_company_date" required />
        </div>
        <div>
          <label htmlFor="renter_date">Date (Renter):</label>
          <input type="date" id="renter_date" name="renter_date" required />
        </div>
        </li>
        </ol>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Agreement;