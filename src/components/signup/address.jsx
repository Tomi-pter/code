import React, {useState, useEffect, useCallback} from "react";

import Input from "../shared/input";
import Dropdown from "../shared/dropdown";
import PrevIcon from "../../assets/icon/prev-green.svg";
import NextIcon from "../../assets/icon/next-white.svg";

const Address = ({ setForm, formData, navigation }) => {
  const { address, city, state, postalCode, country } = formData;
  const { previous, next } = navigation;
  const [isDisabled, setDisabled] = useState(true);
  const states = [
    ["AL", "Alabama"],
    ["AK", "Alaska"],
    ["AZ", "Arizona"],
    ["AR", "Arkansas"],
    ["CA", "California"],
    ["CO", "Colorado"],
    ["CT", "Connecticut"],
    ["DE", "Delaware"],
    ["DC", "District of Columbia"],
    ["FL", "Florida"],
    ["GA", "Georgia"],
    ["HI", "Hawaii"],
    ["ID", "Idaho"],
    ["IL", "Illinois"],
    ["IN", "Indiana"],
    ["IA", "Iowa"],
    ["KS", "Kansas"],
    ["KY", "Kentucky"],
    ["LA", "Louisiana"],
    ["ME", "Maine"],
    ["MD", "Maryland"],
    ["MA", "Massachusetts"],
    ["MI", "Michigan"],
    ["MN", "Minnesota"],
    ["MS", "Mississippi"],
    ["MO", "Missouri"],
    ["MT", "Montana"],
    ["NE", "Nebraska"],
    ["NV", "Nevada"],
    ["NH", "New Hampshire"],
    ["NJ", "New Jersey"],
    ["NM", "New Mexico"],
    ["NY", "New York"],
    ["NC", "North Carolina"],
    ["ND", "North Dakota"],
    ["OH", "Ohio"],
    ["OK", "Oklahoma"],
    ["OR", "Oregon"],
    ["PA", "Pennsylvania"],
    ["RI", "Rhode Island"],
    ["SC", "South Carolina"],
    ["SD", "South Dakota"],
    ["TN", "Tennessee"],
    ["TX", "Texas"],
    ["UT", "Utah"],
    ["VT", "Vermont"],
    ["VA", "Virginia"],
    ["WA", "Washington"],
    ["WV", "West Virginia"],
    ["WI", "Wisconsin"],
    ["WY", "Wyoming"]
  ];
  const countries = [
    ["Afghanistan", "Afghanistan"],
    ["Albania", "Albania"],
    ["Algeria", "Algeria"],
    ["American Samoa", "American Samoa"],
    ["Andorra", "Andorra"],
    ["Angola", "Angola"],
    ["Anguilla", "Anguilla"],
    ["Antartica", "Antarctica"],
    ["Antigua and Barbuda", "Antigua and Barbuda"],
    ["Argentina", "Argentina"],
    ["Armenia", "Armenia"],
    ["Aruba", "Aruba"],
    ["Australia", "Australia"],
    ["Austria", "Austria"],
    ["Azerbaijan", "Azerbaijan"],
    ["Bahamas", "Bahamas"],
    ["Bahrain", "Bahrain"],
    ["Bangladesh", "Bangladesh"],
    ["Barbados", "Barbados"],
    ["Belarus", "Belarus"],
    ["Belgium", "Belgium"],
    ["Belize", "Belize"],
    ["Benin", "Benin"],
    ["Bermuda", "Bermuda"],
    ["Bhutan", "Bhutan"],
    ["Bolivia", "Bolivia"],
    ["Bosnia and Herzegowina", "Bosnia and Herzegowina"],
    ["Botswana", "Botswana"],
    ["Bouvet Island", "Bouvet Island"],
    ["Brazil", "Brazil"],
    ["British Indian Ocean Territory", "British Indian Ocean Territory"],
    ["Brunei Darussalam", "Brunei Darussalam"],
    ["Bulgaria", "Bulgaria"],
    ["Burkina Faso", "Burkina Faso"],
    ["Burundi", "Burundi"],
    ["Cambodia", "Cambodia"],
    ["Cameroon", "Cameroon"],
    ["Canada", "Canada"],
    ["Cape Verde", "Cape Verde"],
    ["Cayman Islands", "Cayman Islands"],
    ["Central African Republic", "Central African Republic"],
    ["Chad", "Chad"],
    ["Chile", "Chile"],
    ["China", "China"],
    ["Christmas Island", "Christmas Island"],
    ["Cocos Islands", "Cocos (Keeling) Islands"],
    ["Colombia", "Colombia"],
    ["Comoros", "Comoros"],
    ["Congo", "Congo"],
    ["Cook Islands", "Cook Islands"],
    ["Costa Rica", "Costa Rica"],
    ["Cota D'Ivoire", "Cote d'Ivoire"],
    ["Croatia", "Croatia (Hrvatska)"],
    ["Cuba", "Cuba"],
    ["Cyprus", "Cyprus"],
    ["Czech Republic", "Czech Republic"],
    ["Denmark", "Denmark"],
    ["Djibouti", "Djibouti"],
    ["Dominica", "Dominica"],
    ["Dominican Republic", "Dominican Republic"],
    ["East Timor", "East Timor"],
    ["Ecuador", "Ecuador"],
    ["Egypt", "Egypt"],
    ["El Salvador", "El Salvador"],
    ["Equatorial Guinea", "Equatorial Guinea"],
    ["Eritrea", "Eritrea"],
    ["Estonia", "Estonia"],
    ["Ethiopia", "Ethiopia"],
    ["Falkland Islands", "Falkland Islands (Malvinas)"],
    ["Faroe Islands", "Faroe Islands"],
    ["Fiji", "Fiji"],
    ["Finland", "Finland"],
    ["France", "France"],
    ["France Metropolitan", "France, Metropolitan"],
    ["French Guiana", "French Guiana"],
    ["French Polynesia", "French Polynesia"],
    ["French Southern Territories", "French Southern Territories"],
    ["Gabon", "Gabon"],
    ["Gambia", "Gambia"],
    ["Georgia", "Georgia"],
    ["Germany", "Germany"],
    ["Ghana", "Ghana"],
    ["Gibraltar", "Gibraltar"],
    ["Greece", "Greece"],
    ["Greenland", "Greenland"],
    ["Grenada", "Grenada"],
    ["Guadeloupe", "Guadeloupe"],
    ["Guam", "Guam"],
    ["Guatemala", "Guatemala"],
    ["Guinea", "Guinea"],
    ["Guinea-Bissau", "Guinea-Bissau"],
    ["Guyana", "Guyana"],
    ["Haiti", "Haiti"],
    ["Heard and McDonald Islands", "Heard and Mc Donald Islands"],
    ["Holy See", "Holy See (Vatican City State)"],
    ["Honduras", "Honduras"],
    ["Hong Kong", "Hong Kong"],
    ["Hungary", "Hungary"],
    ["Iceland", "Iceland"],
    ["India", "India"],
    ["Indonesia", "Indonesia"],
    ["Iran", "Iran (Islamic Republic of)"],
    ["Iraq", "Iraq"],
    ["Ireland", "Ireland"],
    ["Israel", "Israel"],
    ["Italy", "Italy"],
    ["Jamaica", "Jamaica"],
    ["Japan", "Japan"],
    ["Jordan", "Jordan"],
    ["Kazakhstan", "Kazakhstan"],
    ["Kenya", "Kenya"],
    ["Kiribati", "Kiribati"],
    ["Democratic People's Republic of Korea", "Korea, Democratic People's Republic of"],
    ["Korea", "Korea, Republic of"],
    ["Kuwait", "Kuwait"],
    ["Kyrgyzstan", "Kyrgyzstan"],
    ["Lao", "Lao People's Democratic Republic"],
    ["Latvia", "Latvia"],
    ["Lebanon", "Lebanon"],
    ["Lesotho", "Lesotho"],
    ["Liberia", "Liberia"],
    ["Libyan Arab Jamahiriya", "Libyan Arab Jamahiriya"],
    ["Liechtenstein", "Liechtenstein"],
    ["Lithuania", "Lithuania"],
    ["Luxembourg", "Luxembourg"],
    ["Macau", "Macau"],
    ["Macedonia", "Macedonia, The Former Yugoslav Republic of"],
    ["Madagascar", "Madagascar"],
    ["Malawi", "Malawi"],
    ["Malaysia", "Malaysia"],
    ["Maldives", "Maldives"],
    ["Mali", "Mali"],
    ["Malta", "Malta"],
    ["Marshall Islands", "Marshall Islands"],
    ["Martinique", "Martinique"],
    ["Mauritania", "Mauritania"],
    ["Mauritius", "Mauritius"],
    ["Mayotte", "Mayotte"],
    ["Mexico", "Mexico"],
    ["Micronesia", "Micronesia, Federated States of"],
    ["Moldova", "Moldova, Republic of"],
    ["Monaco", "Monaco"],
    ["Mongolia", "Mongolia"],
    ["Montserrat", "Montserrat"],
    ["Morocco", "Morocco"],
    ["Mozambique", "Mozambique"],
    ["Myanmar", "Myanmar"],
    ["Namibia", "Namibia"],
    ["Nauru", "Nauru"],
    ["Nepal", "Nepal"],
    ["Netherlands", "Netherlands"],
    ["Netherlands Antilles", "Netherlands Antilles"],
    ["New Caledonia", "New Caledonia"],
    ["New Zealand", "New Zealand"],
    ["Nicaragua", "Nicaragua"],
    ["Niger", "Niger"],
    ["Nigeria", "Nigeria"],
    ["Niue", "Niue"],
    ["Norfolk Island", "Norfolk Island"],
    ["Northern Mariana Islands", "Northern Mariana Islands"],
    ["Norway", "Norway"],
    ["Oman", "Oman"],
    ["Pakistan", "Pakistan"],
    ["Palau", "Palau"],
    ["Panama", "Panama"],
    ["Papua New Guinea", "Papua New Guinea"],
    ["Paraguay", "Paraguay"],
    ["Peru", "Peru"],
    ["Philippines", "Philippines"],
    ["Pitcairn", "Pitcairn"],
    ["Poland", "Poland"],
    ["Portugal", "Portugal"],
    ["Puerto Rico", "Puerto Rico"],
    ["Qatar", "Qatar"],
    ["Reunion", "Reunion"],
    ["Romania", "Romania"],
    ["Russia", "Russian Federation"],
    ["Rwanda", "Rwanda"],
    ["Saint Kitts and Nevis", "Saint Kitts and Nevis"], 
    ["Saint LUCIA", "Saint LUCIA"],
    ["Saint Vincent", "Saint Vincent and the Grenadines"],
    ["Samoa", "Samoa"],
    ["San Marino", "San Marino"],
    ["Sao Tome and Principe", "Sao Tome and Principe"], 
    ["Saudi Arabia", "Saudi Arabia"],
    ["Senegal", "Senegal"],
    ["Seychelles", "Seychelles"],
    ["Sierra", "Sierra Leone"],
    ["Singapore", "Singapore"],
    ["Slovakia", "Slovakia (Slovak Republic)"],
    ["Slovenia", "Slovenia"],
    ["Solomon Islands", "Solomon Islands"],
    ["Somalia", "Somalia"],
    ["South Africa", "South Africa"],
    ["South Georgia", "South Georgia and the South Sandwich Islands"],
    ["Span", "Spain"],
    ["SriLanka", "Sri Lanka"],
    ["St. Helena", "St. Helena"],
    ["St. Pierre and Miguelon", "St. Pierre and Miquelon"],
    ["Sudan", "Sudan"],
    ["Suriname", "Suriname"],
    ["Svalbard", "Svalbard and Jan Mayen Islands"],
    ["Swaziland", "Swaziland"],
    ["Sweden", "Sweden"],
    ["Switzerland", "Switzerland"],
    ["Syria", "Syrian Arab Republic"],
    ["Taiwan", "Taiwan, Province of China"],
    ["Tajikistan", "Tajikistan"],
    ["Tanzania", "Tanzania, United Republic of"],
    ["Thailand", "Thailand"],
    ["Togo", "Togo"],
    ["Tokelau", "Tokelau"],
    ["Tonga", "Tonga"],
    ["Trinidad and Tobago", "Trinidad and Tobago"],
    ["Tunisia", "Tunisia"],
    ["Turkey", "Turkey"],
    ["Turkmenistan", "Turkmenistan"],
    ["Turks and Caicos", "Turks and Caicos Islands"],
    ["Tuvalu", "Tuvalu"],
    ["Uganda", "Uganda"],
    ["Ukraine", "Ukraine"],
    ["United Arab Emirates", "United Arab Emirates"],
    ["United Kingdom", "United Kingdom"],
    ["United States", "United States"],
    ["United States Minor Outlying Islands", "United States Minor Outlying Islands"],
    ["Uruguay", "Uruguay"],
    ["Uzbekistan", "Uzbekistan"],
    ["Vanuatu", "Vanuatu"],
    ["Venezuela", "Venezuela"],
    ["Vietnam", "Viet Nam"],
    ["Virgin Islands (British)", "Virgin Islands (British)"],
    ["Virgin Islands (U.S)", "Virgin Islands (U.S.)"],
    ["Wallis and Futana Islands", "Wallis and Futuna Islands"],
    ["Western Sahara", "Western Sahara"],
    ["Yemen", "Yemen"],
    ["Serbia", "Serbia"],
    ["Zambia", "Zambia"],
    ["Zimbabwe", "Zimbabwe"],
  ]

  const setCountry = (e) => {
    const value = e.target.value.toUpperCase();
    setForm({
      target: {
        name: 'country',
        value
      }
    })
  }

  const validation = useCallback(() => {
    address && city && state && postalCode && country ? setDisabled(false) : setDisabled(true);
  }, [address, city, state, postalCode, country])

  useEffect(() => {
    validation();
  }, [validation])

  return (
    <div className="form">
      <h4>Shipping Address</h4>
      <Input
        label="Address"
        name="address"
        type="text"
        value={address}
        onChange={setForm}
      />
      <Input label="City" name="city" type="text" value={city} onChange={setForm} />
      <Dropdown label="State" name="state" value={state} options={states} onChange={setForm} />
      <Input label="Postal Code" name="postalCode" type="text" value={postalCode} onChange={setForm} />
      <Dropdown label="Country" name="country" value={country} options={countries} onChange={setCountry} />
      <div className="d-flex align-items-center justify-content-end nav">
        <button className="prev mr-5" onClick={previous}><img src={PrevIcon} alt="" /> <span>Previous Step</span></button>
        <button className="next" onClick={next} disabled={isDisabled}><span>Next Step</span> <img src={NextIcon} alt="" /></button>
      </div>
    </div>
  );
};

export default Address;