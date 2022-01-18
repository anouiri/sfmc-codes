<script language="javascript" runat="server">
Platform.Load('Core', '1');

var prox = new Script.Util.WSProxy();

var queryStr = '';
    queryStr += 'SELECT DISTINCT';
    queryStr += '\nEmailAddress AS [Email Address]';
    queryStr += '\nFROM _Sent s';
    queryStr += '\nLEFT JOIN _Subscribers sub'; // add ENT. prefix if using in child BU
    queryStr += '\n   ON s.SubscriberKey = sub.SubscriberKey';
    queryStr += '\nLEFT JOIN _Open o';
    queryStr += '\n   ON s.SubscriberKey = o.SubscriberKey';
    queryStr += '\nWHERE o.SubscriberKey IS NULL';

  var queryDef = {
    CustomerKey: 'QUERY_ACTIVITY_EXTERNAL_KEY',
    ObjectID: 'QUERY_ACTIVITY_URL_ID',
    QueryText: queryStr,
    TargetType: 'DE',
    TargetUpdateType: 'Update',
    DataExtensionTarget: {
      CustomerKey: 'AUTO-SUPRESSION_LIST_EXTERNAL_KEY',
      Name: 'AUTO-SUPRESSION_NAME'
    }
  };
var updateQuery = prox.updateItem('QueryDefinition', queryDef);

Write('result: ' + Stringify(updateQuery))

</script>