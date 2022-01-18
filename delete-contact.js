<script language="javascript" runat="server"> 
Platform.Load("core","1.1.5");

var eid = Platform.Function.AuthenticatedEnterpriseID();
var deKey = 'INSERT_DE_KEY';
var clientId = 'INSERT_CLIENT_ID';
var clientSecret = 'INSERT_CLIENT_SECRET';
var authBaseUrl = 'INSERT_AUTH_BASE_URL';

var authUrl = authBaseUrl + 'v2/token/'
var contentType = 'application/json';

payload =  '{';
payload += ' "grant_type": "client_credentials",';
payload += ' "client_id":"' + clientId + '",';
payload += ' "client_secret":"' + clientSecret + '",';
payload += ' "scope": "list_and_subscribers_write",';
payload += ' "account_id": "' + eid + '" ';
payload += '}';

var result = HTTP.Post(authUrl, contentType, payload);
var response = result["Response"][0];
var accessToken = Platform.Function.ParseJSON(response).access_token;
var restUrl = Platform.Function.ParseJSON(response).rest_instance_url;

Platform.Response.Write(" response: " + response);
Platform.Response.Write("\n\n token: " + accessToken);
Platform.Response.Write("\n\n rest URL: " + restUrl);

var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];

payload =  '{';
payload += '   "deleteOperationType": "ContactAndAttributes",';
payload += '   "targetList": { ';
payload += '      "listType": { ';
payload += '         "listTypeID":3';
payload += '      },';
payload += '   "listKey": "' + deKey + '"';
payload += '   },';
payload += '   "deleteListWhenCompleted":false,';
payload += '   "deleteListContentsWhenCompleted":true';
payload += '}';

var deleteEndpoint = restUrl + 'contacts/v1/contacts/actions/delete?type=listReference';

var result = HTTP.Post(deleteEndpoint, contentType, payload, headerNames, headerValues)

    result = Stringify(result).replace(/[\n\r]/g, '');

Platform.Response.Write("\n\n result: " + result);

</script>
