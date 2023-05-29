# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket #1: 
#### Modify the Shifts table to support custom IDs

##### Description: 
In this ticket, the Shifts table in the database is modified to add a new column for the Facility-specific custom id. This will allow Facilities to store their own ids for each Agent they assign to a shift.

##### Acceptance Criteria:

1. The Shifts table has a new column 'agent_custom_id' that can hold string values. It should be null be default
2. Existing Shifts data should not be affected by this change.
3. Facility can save a custom id for each Agent they assign to a shift.
4. An agent can be assigned a new 'agent_custom_id' when the agent is moved to a new facility

##### Time/Effort Estimate: 
 The estimated time for this implementation is 1-3 hours

##### Implementation Details:

1. Make a migration script to alter the Shifts table and add the 'agent_custom_id' column.
2. Modify the related model/ORM to include the 'agent_custom_id' field.
3. Run the migration script to actually create the new column in the database


### Ticket #2: 
#### Modify the Client-facing Interface accessible to the Facilities to Support Saving Custom IDs

##### Description: 
Extend the Client-facing Interface accessible to the Facilities to allow for the input of a custom id for each Agent assigned to a shift. 

##### Acceptance Criteria:

1. Facilities can view and edit the custom id of each Agent they assign to a shift through their interface.
2. Changes are correctly saved to the database and visible on subsequent page loads.

##### Time/Effort Estimate: 
The estimated time for this implementation is 5-7 hours

##### Implementation Details:

1. Modify the Client-facing Interface accessible to the facilities to add a new input field for custom id in the relevant form.

### Ticket #3: 
#### Create a backend endpoint/service to Support Saving Custom IDs

##### Description: 
Create a backend endpoint/service that will be exposed to the facilities resources. The endpoint will be used to update the appropriate row in the shift table with the 'agent_custom_id'. 

##### Acceptance Criteria:

1. Facilities can view and edit the custom id of each Agent they assign to a shift through their interface.
2. Changes are correctly saved to the database and can be fetched from the database.

##### Time/Effort Estimate: 
The estimated time for this implementation is 3-5 hours

##### Implementation Details:

1. Create a back-end endpoint/service to accept and process the custom id input.
2. The endpoint should accept the facility's ID and 'agent_custom_id' as minimum payload.


### Ticket #3: 
#### Modify the getShiftsByFacility function to include Custom IDs

##### Description: 
 Adjust the getShiftsByFacility function to also return the custom id of the Agent assigned to each shift.

##### Acceptance Criteria:

1. The function getShiftsByFacility also returns the custom id of the Agent along with other details.
2. The function getShiftsByFacility should accept 'agent_custom_id' as part of its arguments


##### Time/Effort Estimate: 
The estimated time for this implementation is 2-3 hours

##### Implementation Details:

1. Modify the SQL query/ORM method in the getShiftsByFacility function to include the 'custom_id' field from the Shifts table.
2. Modify the getShiftsByFacility function to accept 'agent_custom_id' as part of its arguments

### Ticket #4: 
#### Adjust the generateReport function to use Custom IDs

#### Description: 
Modify the generateReport function to use the custom id when generating PDF reports for the Facilities.

#### Acceptance Criteria:

1. The generateReport function uses the custom id of the Agent instead of the database id.
2. The PDF reports correctly display the custom id.

#### Time/Effort Estimate: 
The estimated time for this implementation is 4-6 hours

#### Implementation Details:

1. Modify the generateReport function to replace the database id of the Agent with the custom id in the report data.
2. Test the function thoroughly with different data sets to ensure the PDF generation is correct.
