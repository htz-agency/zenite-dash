able Calculation Types
Applies to: Tableau Cloud, Tableau Desktop, Tableau Public, Tableau Server
This article describes the types of table calculations available in Tableau and when to use them. It uses simple examples to demonstrate how each calculation transforms data in a table. For more information on how to create and configure table calculations, see Create a table calculation.

Difference From calculation
A Difference From table calculation computes the difference between the current value and another value in the table for each mark in the visualization.

With a Difference From, Percent Difference From, or Percent From calculation, there are always two values to consider: the current value, and the value from which the difference should be calculated. In most cases, you want to calculate the difference between the current value and the previous value, as in the procedure above. But in some cases you may want something different.

To specify from which value the difference should be calculated:

Right-click a measure in the view and select Add Table Calculation.

In the Table Calculation dialog box, for Relative to, select one of the following options:

Previous	Calculates the difference between the current value and the previous value in the partition. This is the default value.
Next	Calculates the difference between the current value and the next value in the partition.
First	Calculates the difference between the current value and the first value in the partition.
Last	Calculates the difference between the current value and the last value in the partition.

Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Difference From table calculation to calculate how sales fluctuate (how much they go up or down) between the years for each month.

A table that shows sales by quarter and month. One row is selected and the Table Calculation window shows options for editing the calculation type and computation specifications.

You can see that in January, there was a 368 USD difference between sales in 2012 and 2013, and a 26,161 USD difference between sales in 2013 and 2014.

Tip: When calculating year-over-year growth, the first year doesn't have a previous year to compare to, so the column is left blank. Hide the column that you don’t want to show to keep the calculation intact. For details, see Hide rows and columns.

Why? If you filtered out the first year to remove it from the view, it would also remove it from the calculation so the second year doesn't have a previous year to compare to and is left blank. Instead of filtering, hiding the column keeps the calculation intact.

Moving calculation
For each mark in the view, a Moving Calculation table calculation (sometimes referred to as a rolling calculation) determines the value for a mark in the view by performing an aggregation (sum, average, minimum, or maximum) across a specified number of values before and/or after the current value.

A moving calculation is typically used to smooth short-term fluctuations in your data so that you can see long-term trends. For example, with securities data there are so many fluctuations every day that it is hard to see the big picture through all the ups and downs. You can use a moving calculation to define a range of values to summarize using an aggregation of your choice.

Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Moving calculation to find out how sales totals are trending over time. To do this, you can transform each monthly total so that it averages the monthly total for it and the two previous months over time.

A text table and the table calc options menu showing compute using Table (down then across)

You can see the average sales over time. For example, the value listed for December 2011 is the average sales for October, November, and December, 2011. The value listed for January, 2012 is the average sales for November and December, 2011, and January, 2012.

Add Secondary Calculation
With Running Total and Moving Calculation table calculations, you have the option to transform values twice to obtain the result you want—that is, to add a secondary table calculation on top of the primary table calculation. For example, you could add an initial table calculation to calculate the running total for sales per month within each individual year, and then a secondary calculation to calculate the year-over-year percent difference for each month from one year to the next.

For an example showing how to create a secondary calculation, see Running Total calculation.

Percent Difference From calculation
A Percent Difference From table calculation computes the difference between the current value and another value in the table as a percentage for each mark in the visualization.

With a Difference From, Percent Difference From, or Percent From calculation, there are always two values to consider: the current value, and the value from which the difference should be calculated. In most cases, you want to calculate the difference between the current value and the previous value, as in the procedure above. But in some cases you may want something different.

To specify from which value the difference should be calculated:

Right-click a measure in the view and select Add Table Calculation.

In the Table Calculation dialog box, for Relative to, select one of the following options:

Previous	Calculates the difference between the current value and the previous value in the partition. This is the default value.
Next	Calculates the difference between the current value and the next value in the partition.
First	Calculates the difference between the current value and the first value in the partition.
Last	Calculates the difference between the current value and the last value in the partition.


Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Percent Difference From table calculation to calculate how sales fluctuate (how much they go up or down) between the years for each month. Values are calculated as percentages.

A text table with a column highlighted and the table calc options menu showing compute using Table (down)

You can see that between January and February, 2011, there was a -66% difference in sales, but between February and March, 2011, there was a huge improvement of 1,058% sales.

Percent From calculation
A Percent From table calculation computes a value as a percentage of some other value—typically, as a percentage of the previous value in the table—for each mark in the visualization.

With a Difference From, Percent Difference From, or Percent From calculation, there are always two values to consider: the current value, and the value from which the difference should be calculated. In most cases, you want to calculate the difference between the current value and the previous value, as in the procedure above. But in some cases you may want something different.

To specify from which value the difference should be calculated:

Right-click a measure in the view and select Add Table Calculation.

In the Table Calculation dialog box, for Relative to, select one of the following options:

Previous	Calculates the difference between the current value and the previous value in the partition. This is the default value.
Next	Calculates the difference between the current value and the next value in the partition.
First	Calculates the difference between the current value and the first value in the partition.
Last	Calculates the difference between the current value and the last value in the partition.


Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Percent From table calculation to calculate the percentage of a previous value. For example, you can calculate what percentage of sales in January 2011, was made in February 2011.

A text table with a column highlighted and the table calc options menu showing compute using Table (down)

You can see that February, 2011 made 34% of the sales made in January, 2011; March, 2011 made 1,158% of the sales made in February, and so on.

Percent of Total calculation
For each mark in the view, a Percent of Total table calculation computes a value as a percentage of all values in the current partition.

Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Percent of Total table calculation to calculate the percentage of total sales each month makes within a quarter. For example, you can see that January, 2011 makes up 18.73% of sales made in Q1.

A text table with a the intersection of one row and one column highlighted and the table calc options menu showing compute using Pane (down)

Or you can calculate the percentage of total sales each month makes within a year. For example, you can see that January, 2011 makes up 2.88% of sales made in 2011.

A text table with a column highlighted and the table calc options menu showing compute using Table (down)

Percentile calculation
For each mark in the view, a Percentile table calculation computes a percentile rank for each value in a partition.

Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Percentile table calculation to rank the total sales for each month in a year as a percentage, rather than a whole number (for example, 1 through 10).

A text table with a column highlighted and the table calc options menu showing compute using Table (down)

Since February made a very small amount of sales in 2012 compared to the overall total, it is ranked as 0.0% (or number 1 out of 12, since this example is Ascending, and therefore ranked from least to most). Sales in January, 2012 were a bit higher and were therefore ranked as 9.1% (or number 2 out of 12 months). Since November made the most sales in 2012, it is ranked as 100% (or number 12 out of 12).

Descending vs. Ascending
Ascending order ranks values from least to most. Descending order ranks values from most to least.

Rank calculation
For each mark in the view, a Rank table calculation computes a ranking for each value in a partition.

Example
Consider the text table below. It shows the total sales per month for 2011, 2012, 2013, and 2014 for a large store chain.

A table displaying sales figures by month and quarter from 2011 to 2014.

You can use a Rank table calculation to calculate a ranking for each month in a year.

table_calculations_rank1.png

You can see that, since November made the most amount of sales in 2012, it is ranked as number 1 (because the rank is in descending order, meaning it is ordered from most to least). Since February made the least amount of sales in 2012, it is ranked number 12.

Descending vs. Ascending
Ascending order ranks values from least to most. Descending order ranks values from most to least. For Rank table calculation, the default value is Descending.

Rank Type
One issue with Rank calculations is that there may be more than one mark with the same value. What would happen, for example, if Tables in the Central region and Appliances in the South region both had sales of exactly $36,729? Tableau lets you specify how to handle such cases by including an additional field in the Table Calculation dialog box when you set Calculation Type to Rank.

The choices are listed below. The number sequence at the beginning of each option show how each option would rank a hypothetical set of four values where two of the values are identical:

Option	Result
Competition (1, 2, 2, 4)	Identical values are assigned an identical rank. The highest value is ranked 1 and then the next two, identical values, are both are ranked 2. The next value is then ranked 4.
Modified Competition (1, 3, 3, 4)	Identical values are assigned an identical rank. The highest value is ranked 1 and then the next two, identical values, are both are ranked 3. The next value is then ranked 4.
Dense (1, 2, 2, 3)	Duplicate values are all given the same rank, which is the next number in the ranking sequence. The next value after the duplicate values is computed as though the duplicate values were a single value.
Unique (1, 2, 3, 4)	Duplicate values are given unique rankings, according to the direction in which the ranking is being computed.
Running Total calculation
For each mark in the view, a Running Total table calculation aggregates values cumulatively in a partition. It can do this by summing values, averaging values, or replacing all values with either the lowest or highest actual value.

Suppose you are starting with the following text view, which shows sales totals broken out by year (from left to right) and by quarter and month (from top to bottom):

A table of monthly order totals from 2011 to 2014.

Instead of absolute sales values, you want to see a running total of sales for each year, such that each month’s sales are added to all previous months’ sales.

Create the Basic View
Connect to the Sample - Superstore data source.

Click and drag the Order Date field in the Data pane and drag it to the Columns shelf.

The default date level is YEAR(Order Date).

Click and drag Order Date again and drop it this time on the Rows shelf.

Click on the right side of the field to open the context menu. Then choose Quarter.

A date field's context menu showing the discrete quarter datepart

You will see two options named Quarter. Be sure to choose the first one.

The field should now read QUARTER(Order Date).

Note: If you are creating the view on the web, the menu looks a bit different.

Click and drag Order Date a third time and drop it on the Rows shelf to the right of QUARTER(Order Date).

Click on the right side of the field to open the context menu and this time choose Month (again, choose the first of two options named Month). The field should now read MONTH(Order Date).

Drag Sales from the Data pane and drop it on Text on the Marks card.

You now have the basic view, showing Sales by Order Date over a four-year period, by month, quarter, and year.

Add a Running Total table calculation to the basic view
Click the SUM(Sales) field on the Marks card and choose Add table calculation.

In the Table Calculation dialog box, choose Running Total as the Calculation Type.

Choose Table (Down) from the Compute Using list.

The highlighting in the view shows how this Compute Using value sets the scope of the calculation in the view:

A table of monthly order totals with one year's column highlighted

Comparing the values in the original text view with the values in this view shows that the result is correct. The monthly values ascend steadily and the December value (484,247) is the same value you see if you show column grand totals (from the Analysis menu, select Totals > Show column grand totals).

Click the X in the upper-right corner of the Table Calculations dialog box to close it.

The Running Total doesn’t have to be a sum
For a Running Total table calculation, Tableau can update values cumulatively in other ways than summing. Choose one of the options from the drop-down list just below the Calculation Type field:

Option	Meaning
Sum	Each value is added to the previous value.
Average	The running total averages the current and all previous values.
Minimum	All values are replaced with the lowest value in the original partition.
Maximum	All values are replaced with the highest value in the original partition.
Restarting every option
The Restarting every option is only available when you select Specific Dimensions in the Table Calculations dialog box and when more than one dimension is selected in the field immediately below the Compute Using options—that is, when more than one dimension is defined as an addressing field.

This option is not available when you’re defining a table calculation with Compute Using.

You can use this setting to set a break (that is, restart of the calculation) in the view, based on a particular dimension.

Restarting every can be useful in the following situations:
With dates or other hierarchies, if you restart every month, as you bring in Year or Quarter, Tableau knows to partition automatically.

With non-hierarchies, Restarting every affects the sorting. If you want to address on Products and partition by State, but you want the products sorted by SUM(Sales) within each state, you need to include States as an addressing field under Specific Dimensions, but then restart every state. Otherwise, the sort by SUM(Sales) would be based on each product's sum of sales across all states.

For example, if you take the result of the Running Total calculation you added above, you can see the effect of Restarting every by doing the following:

Click the SUM(Sales) field on the Marks card and choose Edit table calculation.

In the Table Calculation dialog box, choose Specific Dimensions.

Notice that two dimensions are now checked in the list box of dimensions: Quarter of Order Date and Month of Order Date. These are the addressing fields, and because more than one field is being used for addressing, Restarting every is now available.

The choices available from the At the level drop-down list are:

None	Specifies that the calculation should be performed at the level of greatest granularity. This is the default option. This option does not change the view.
Quarter of Order Date	Specifies that the calculation should be performed at the quarter level.
If you choose Quarter of Order Date, the view updates to show the effect of this change:

A text table with a the intersection of one row and one column highlighted

The calculation now restarts after every quarter. If you click out of the Table Calculations dialog box (to dismiss the highlighting) you can see this more clearly.

Click the X in the upper-right corner of the Table Calculations dialog box to close it.

Add Secondary Calculation
With Running Total and Moving Calculation table calculations, you have the option to transform values twice to obtain the result you want—that is, to add a secondary table calculation on top of the primary table calculation. For example, you could add an initial table calculation to calculate the running total for sales per month within each individual year, and then a secondary calculation to calculate the year-over-year percent difference for each month from one year to the next.

To do this, first add the primary table calculation, as shown above. Then continue as follows:

Click the SUM(Sales) field on the Marks card and select Edit table calculation.

In the Table Calculation dialog box, click Add Secondary Calculation.

The Table Calculation dialog box expands to show a second panel:

A table calculation window that lets you customize calculations.

In the second panel, choose Percent Difference From as the Secondary Calculation Type.

You do not need to change the Compute Using selection: Table (Across) is the right option.

Click the X in the upper-right corner to dismiss the Table Calculation dialog box.

Now your view shows what you needed: a year-over-year percent difference of a running total:

A table displaying order quantities by month and year.

