SELECT
    sfdc.Id as SubscriberKey,
    sfdc.Email as EmailAddress,
    CASE
    	WHEN allsub.Status = 'held' THEN 'active'
    	WHEN allsub.Status = 'bounced' THEN 'active'
    	ELSE allsub.Status
    END as Status
FROM
    Contact_Salesforce as sfdc
RIGHT JOIN
    _subscribers as allsub
ON sfdc.Id = allsub.SubscriberKey
WHERE sfdc.Email != allsub.EmailAddress
