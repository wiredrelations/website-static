let urlParams = {};
(window.onpopstate = function () {
  let match,
    pl = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  while (match = search.exec(query)) {
    if (decode(match[1]) in urlParams) {
      if (!Array.isArray(urlParams[decode(match[1])])) {
        urlParams[decode(match[1])] = [urlParams[decode(match[1])]];
      }
      urlParams[decode(match[1])].push(decode(match[2]));
    } else {
      urlParams[decode(match[1])] = decode(match[2]);
    }
  }
})();

let hsContext;
let uuid;
try {
  hsContext = JSON.parse(urlParams.hs_context);
}catch (e) {
  //uuid = self.crypto.randomUUID();
  console.log(e);
}

let form = document.getElementById('wf-form-Account-details');
let submitBtn = document.getElementById('submitBtn');
let progress = document.getElementById('progress');
let siteName = document.getElementById('sitename');
let companyName = document.getElementById('companyname');
let password = document.getElementById('psw');
let languageButtons = document.querySelectorAll("input[name=radio]");
let terms = document.getElementById('Terms');
let ulSiteNameInvalid = document.getElementById('ulSiteNameInvalid');
let ulPasswordInvalid = document.getElementById('ulPasswordInvalid');
let ulLanguageInvalid = document.getElementById('ulLanguageInvalid');
let ulTermsInvalid = document.getElementById('ulTermsInvalid');
let siteNameIsValid = false;
let passwordIsValid = false;
let langIsSelected = false;
let termsIsValid = false;
let msgSiteNameInvalid = '';

const webflowLangDA = false;

const errSiteNameTakenEN = webflowLangDA ? 'Indtast venligst et andet site navn, da det valgte allerede er i brug.' : 'Please enter another site name, as it\'s already taken.';
const errSiteNameFormatEN = webflowLangDA ? 'Indtast venligst et gyldigt site navn.' : 'Please enter a valid site name.';
const errPasswordPolicyEN = webflowLangDA ? 'Indtast venligst en gyldig adgangskode.' : 'Please enter a valid password.';
const errSelectLangaugeEN = webflowLangDA ? 'Vælg venligst et sprog til kontoen.' : 'Please select language for the account.';
const errTermsEN = webflowLangDA ? 'Acceptér venligst servicevilkår.' : 'Please accept Terms of service.';

function validSiteName() {
  siteName.classList.remove("invalid", "error");
  ulSiteNameInvalid.style.visibility = 'hidden';
};
function invalidSiteName() {
  siteName.classList.add("invalid", "error");
  ulSiteNameInvalid.style.visibility = 'visible';
  document.getElementById('labelSiteNameInvalid').innerHTML = msgSiteNameInvalid;
};
function validPassword() {
  password.classList.remove("invalid", "error");
  ulPasswordInvalid.style.visibility = 'hidden';
};
function invalidPassword() {
  password.classList.add("invalid", "error");
  ulPasswordInvalid.style.visibility = 'visible';
  document.getElementById('labelPasswordInvalid').innerHTML = errPasswordPolicyEN;
};
function validLanguage() {
  ulLanguageInvalid.style.visibility = 'hidden';
};
function invalidLanguage() {
  ulLanguageInvalid.style.visibility = 'visible';
  document.getElementById('labelLanguageInvalid').innerHTML = errSelectLangaugeEN;
};
function validTerms() {
  ulTermsInvalid.style.visibility = 'hidden';
};
function invalidTerms() {
  ulTermsInvalid.style.visibility = 'visible';
  document.getElementById('labelTermsInvalid').innerHTML = errTermsEN;
};
function disableSubmitButton() {
  submitBtn.disabled = true;
  submitBtn.classList.add("submit-disabled-state");
  progress.style.display = 'block';
  progress.play();
};

function isAllowedSiteName(value) {
  const disallowedSiteNames = [
    'Afghanistan',
    'Aland Islands',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Virgin Islands',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Caicos Islands',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos Islands',
    'Colombia',
    'Comoros',
    'Congo Brazzaville',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote Divoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'England',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'European Union',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Great Britain',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guinea-Bissau',
    'Guinea',
    'Guyana',
    'Haiti',
    'Heard Island',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indian Ocean Territory',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands Antilles',
    'Netherlands',
    'New Caledonia',
    'New Guinea',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'North Korea',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn Islands',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Helena',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Pierre',
    'Saint Vincent',
    'Samoa',
    'San Marino',
    'Sandwich Islands',
    'Sao Tome',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Svalbard',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timorleste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Us Minor Islands',
    'Us Virgin Islands',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'portal',
    'partner',
    'admin',
    'login',
    'signup',
    'gdpr',
    'manage'
  ];
  return !(disallowedSiteNames.map(v => v.toLowerCase()).includes(value.toLowerCase()));
}

async function validateSiteName(val) {
  let exists = true;
  const request = {
    query: "query tenantNameExists($name: String!) {\n" +
      "  tenantNameExists(name: $name)\n" +
      "}",
    variables: {
      name: val.value
    }
  };
  let result = await fetch('https://signupwebflow.wiredrelations.com/graphql/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      if (json.data != null) {
        exists = json.data.tenantNameExists;
        return exists;
      }
    });
  return exists;
}

async function handleSiteName(event) {
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9\-]{1,61}[a-zA-Z0-9]$/;
  let patternOK = false;
  let siteNameAllowedOK = false;
  if (pattern.test(this.value)) {
    patternOK = true;
  } else {
    patternOK = false;
    siteNameIsValid = false;
    msgSiteNameInvalid = errSiteNameFormatEN;
    invalidSiteName();
  }

  if(patternOK) {
    siteNameAllowedOK = isAllowedSiteName(this.value);
    if (!siteNameAllowedOK) {
      siteNameIsValid = false;
      msgSiteNameInvalid = errSiteNameFormatEN;
      invalidSiteName();
    }
  }

  if(patternOK && siteNameAllowedOK) {
    let exists = await validateSiteName(this);
    if(exists) {
      siteNameIsValid = false;
      msgSiteNameInvalid = errSiteNameTakenEN;
      invalidSiteName();
    } else {
      siteNameIsValid = true;
      validSiteName();
    }
  }
}

function handleSiteNameFocus(event) {
  validSiteName();
}

async function handlePassword(event) {
  const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (pattern.test(this.value)) {
    passwordIsValid = true;
    validPassword();
  } else {
    passwordIsValid = false;
    invalidPassword();
  }
}

function handlePasswordFocus(event) {
  validPassword();
}

function handleLanguageButtons(event) {
  for (const radioButton of languageButtons) {
    if (radioButton.checked) {
      langIsSelected = true;
      validLanguage();
      break;
    }
  }
  if(langIsSelected) {
    validLanguage();
  } else {
    invalidLanguage();
  }
}

function handleTerms(event) {
  if (terms.checked) {
    termsIsValid = true;
    validTerms();
  }
  if(termsIsValid) {
    validTerms();
  } else {
    invalidTerms();
  }
}

async function startSignupProcess() {
  let name = (urlParams.firstname + ' ' + urlParams.lastname).padEnd(6, '_');
  let lang = document.querySelector("input[name=radio]:checked").value;
  const request = {
    query: "mutation signUp($input: SignUpRequest) {\r\n signUp(input: $input) {\r\n id,\r\n name,\r\n languageCode,\r\n modules {\r\n modulesEnabled\r\n }\r\n }\r\n}",
    variables: {
      input: {
        email: urlParams.email,
        name: name,
        password: password.value,
        subDomain: siteName.value.toLowerCase(),
        languageCode: lang,
        phone: '',
        companyName: companyName ? companyName.value : ''
      }
    }
  };
  let id = 0;
  if(true) {
    let result = await fetch('https://signupwebflow.wiredrelations.com/graphql/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        if(json.data != null) {
          id = json.data.signUp.id;
          return id;
        }
      });
    return id;
  }
}

function validateForm() {
  if(langIsSelected) {
    validLanguage();
  } else {
    invalidLanguage();
  }
  if(termsIsValid) {
    validTerms();
  } else {
    invalidTerms();
  }
  if (siteNameIsValid && passwordIsValid && langIsSelected && termsIsValid) {
    return true;
  } else {
    return false;
  }
}

function capterraTracker() {
  try {
    const capterra_prefix = 'https://ct.capterra.com';
    const capterra_vid = '2130337';
    const capterra_vkey = 'a848e5c3ecf903d23f973a6797252801';
    let ct = document.createElement('script'); ct.type = 'text/javascript';
    ct.async = true;
    ct.src = capterra_prefix + '/capterra_tracker.js?vid=' + capterra_vid + '&vkey=' + capterra_vkey;
    let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ct, s);
  } catch (exc) {
    console.warn('capterraTracker', exc);
  }
};

async function handleSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
  document.querySelector("input[name=email]").value = urlParams.email;
  document.querySelector("input[name=company_name_in_product]").value = companyName ? companyName.value : '';
  document.querySelector("input[name=company_site_name]").value = siteName ? siteName.value.toLowerCase() : '';

  let isValid = validateForm();

  if(isValid) {
    disableSubmitButton();
    let signupId = await startSignupProcess();
    console.log(signupId);

    let hsForm = document.getElementById('hsForm_20a84c85-53c9-4a90-bafd-86ce542e7c1c');
    hsForm.submit();

    capterraTracker();

    setTimeout( function() {
      window.location = 'https://' + siteName.value.toLowerCase() + '.wiredrelations.com';
    }, 6000 );
  }
}

if(siteName) {
  siteName.addEventListener('blur', handleSiteName);
  siteName.addEventListener('focus', handleSiteNameFocus);
}
if(password) {
  password.addEventListener('blur', handlePassword);
  password.addEventListener('focus', handlePasswordFocus);
}
if(languageButtons) {
  for (const radioButton of languageButtons) {
    radioButton.addEventListener('change', handleLanguageButtons);
  }

}
if(terms) {
  terms.addEventListener('change', handleTerms);
}
if(form) {
  form.addEventListener('submit', handleSubmit, true);
}