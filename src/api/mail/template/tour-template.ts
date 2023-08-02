import { TourMailDto } from "../mail.dto";

export const getTourTemplate = (input: TourMailDto) => {
  const { firstName, lastName, email, telephone, startDate, endDate, adult, child, additionalInfo } = input;

  return (`
  <!DOCTYPE html>
<html>
<head>
  <title>Tour Request Received</title>
</head>
<body>
  <h2>Tour Request Received</h2>
  <p>Hello Admin,</p>
  <p>You have received a new tour request from a user. Here are the details:</p>
  <table>
      <tr>
          <td><strong>First Name:</strong></td>
          <td>${firstName}</td>
      </tr>
      <tr>
          <td><strong>Last Name:</strong></td>
          <td>${lastName}</td>
      </tr>
      <tr>
          <td><strong>Email:</strong></td>
          <td>${email}</td>
      </tr>
      <tr>
          <td><strong>Telephone:</strong></td>
          <td>${telephone}</td>
      </tr>
      <tr>
          <td><strong>Start Date:</strong></td>
          <td>${startDate}</td>
      </tr>
      <tr>
          <td><strong>End Date:</strong></td>
          <td>${endDate}</td>
      </tr>
      <tr>
          <td><strong>Number of Adults:</strong></td>
          <td>${adult}</td>
      </tr>
      <tr>
          <td><strong>Number of Children:</strong></td>
          <td>${child}</td>
      </tr>
      <tr>
          <td><strong>Additional Info:</strong></td>
          <td>${additionalInfo}</td>
      </tr>
  </table>
  <p>Regards,</p>
  <p>${firstName + ' ' + lastName}</p>
</body>
</html>
`)
}
