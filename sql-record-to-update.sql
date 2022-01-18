SELECT
    contact.Id as SubscriberKey,
    contact.Email as EmailAddress,
    CASE
    	WHEN allsub.Status = 'held' THEN 'active'
    	WHEN allsub.Status = 'bounced' THEN 'active'
    	ELSE allsub.Status
    END as Status
FROM
    Contact_Salesforce as contact
RIGHT JOIN
    _subscribers as allsub
ON contact.Id = allsub.SubscriberKey
WHERE contact.Email != allsub.EmailAddress

UNION

SELECT
    lead.Id as SubscriberKey,
    lead.Email as EmailAddress,
    CASE
    	WHEN allsub.Status = 'held' THEN 'active'
    	WHEN allsub.Status = 'bounced' THEN 'active'
    	ELSE allsub.Status
    END as Status
FROM
    Lead_Salesforce as lead
RIGHT JOIN
    _subscribers as allsub
ON lead.Id = allsub.SubscriberKey
WHERE lead.Email != allsub.EmailAddress
