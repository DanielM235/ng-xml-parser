export const XML_CONTENT_1 =
  `<?xml version="1.0"?>
  <?xml-stylesheet type='text/xsl' href='MessageLog.xsl'?>
  <Log FirstSessionID="1" LastSessionID="2">
    <Message Date="06/06/2009" Time="11:25:23" DateTime="2009-06-06T14:25:23.730Z" SessionID="1">
      <From>
        <User FriendlyName="User1"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">HI all</Text>
    </Message>
    <Message Date="06/06/2009" Time="11:26:01" DateTime="2009-06-06T14:26:01.696Z" SessionID="1">
      <From>
        <User FriendlyName="User2"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">Hya</Text>
    </Message>
    <Message Date="06/06/2009" Time="11:26:10" DateTime="2009-06-06T14:26:10.279Z" SessionID="1">
      <From>
        <User FriendlyName="User3"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">Hohe</Text>
    </Message>
    <Message Date="24/06/2010" Time="00:56:07" DateTime="2010-06-23T22:56:07.066Z" SessionID="2">
      <From>
        <User FriendlyName="User4"/>
      </From>
      <To>
        <User FriendlyName="User1"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">hello</Text>
    </Message>
    <Message Date="24/06/2010" Time="00:56:42" DateTime="2010-06-23T22:56:42.692Z" SessionID="2">
      <From>
        <User FriendlyName="User1"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Verdana; color:#000000; ">how are you </Text>
    </Message>
    <Message Date="24/06/2010" Time="00:56:47" DateTime="2010-06-23T22:56:47.437Z" SessionID="2">
      <From>
        <User FriendlyName="User1"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">all fine here</Text>
    </Message>
  </Log>`;

export const XML_INVALID = `abcd`;
export const XML_CONTENT_WITH_ERRORS =
  `<?xml version="1.0"?>
  <?xml-stylesheet type='text/xsl' href='MessageLog.xsl'?>
  <Log FirstSessionID="1" LastSessionID="2">
    <Message Date="06/06/2009" Time="11:25:23" DateTime="2009-06-06T14:25:23.730Z" SessionID="1">
      <From>
        <User FriendlyName="User1"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">HI all</Text>
    </Message>
    <Message Date="06/06/2009" Time="11:26:01" DateTime="2009-06-06T14:26:01.696Z" SessionID="1">
      <From>
        <User FriendlyName="User2"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
    </Message>
    <Message Date="06/06/2009" Time="11:26:10" DateTime="2009-06-06T14:26:10.279Z" SessionID="1">
      <From>
        <User FriendlyName="User3"/>
      </From>
      <To>
        <User FriendlyName="User"/>
      </To>
      <Text Style="font-family:Segoe UI; color:#000000; ">Hohe</Text>
    </Message>
  </Log>`;
