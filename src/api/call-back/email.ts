export const getCallBackMail = (input: CallBackType) => {
  return (`
  <!DOCTYPE html>
<html>
  <body>
    <h1>Callback Request Received</h1>
    <p>You recently received a callback request from: John Doe</p>
    <table>
      <tr>
        <td>Email:</td>
        <td>${input.email}</td>
      </tr>
      <tr>
        <td>Contact:</td>
        <td>${input.contact}</td>
      </tr>
      <tr>
        <td>Phone:</td>
        <td>${input.phone}</td>
      </tr>
      <tr>
        <td>Whatsapp:</td>
        <td>${input.whatsapp}</td>
      </tr>
      <tr>
        <td>Telegram:</td>
        <td>${input.telegram}</td>
      </tr>
      <tr>
        <td>Voice Preference:</td>
        <td>${input.voice}</td>
      </tr>
      <tr>
        <td>Country:</td>
        <td>${input.country}</td>
      </tr>
      <tr>
        <td>Time Zone:</td>
        <td>${input.timezone}</td>
      </tr>
      <tr>
        <td>Notes/Special Requests:</td>
        <td>${input.note}</td>
      </tr>
    </table>
    <p>Please contact this individual at your earliest convenience to arrange the callback. We want to ensure they receive timely and efficient service. </p>
  </body>
</html>
`)
}


interface CallBackType {
  firstName: string;
  lastName?: string;
  email: string;
  contact?: string;
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  voice?: string;
  country: string;
  timezone?: string;
  note?: string;
}