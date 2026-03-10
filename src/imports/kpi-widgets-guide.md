KPI Widgets
Zoho Analytics offers a widget-based model for adding single numbered widgets and chart type widgets within dashboards. These are called KPI Widgets. This is a pretty useful feature to highlight any key metric in a dashboard for easy comprehension. The key metric can be accompanied with associated comparison indicator or plotted against a target to show progression.

Label Widget
Single Label widgets
Label with Secondary Values
Label with Indicator
Chart Widget
Bullet Chart widgets
Dial Chart Widget
Full Dial Chart Widget
Adding Decriptive Tooltip
Drill Through in Widgets
Widgets with Forecast
Widgets with Images
Static Images in Widgets
Dynamic Images in Widgets
Modifying Labels/Text in KPI Widgets
Label Widgets
Zoho Analytics offers a widget-based model for creating single number charts within dashboards. This is a pretty useful feature to highlight any key metric in a dashboard for easy comprehension. The key metric can also be accompanied with associated comparison indicators to highlight the trend. Zoho Analytics currents offers 6 types of single number widgets with or without comparison indicators.

   

Single Label Widget


Label with Secondary Value


Label with Indicator


Chart Type Widgets
Turn your KPI dashboards into more attractive visualizations using the Chart Type Widgets. Chart type widgets are similar to actual charts, except that only a single key metric value is plotted alongside a range, highlighting the current position of the key metric value.

You can create the following chart type widgets in Zoho Analytics:



Bullet Chart
A Bullet Chart is from the family of bar charts, where the key metric is plotted as a bar alongside a range, with a defined minimum and maximum values. You can specify qualitative ranges that are plotted as varying colors, to measure the progress of your key metric value. By default, the qualitative ranges are displayed as varying intensities of a single hue.



Refer to the following presentation to create a Bullet Chart widget.



Learn more about bullet charts.

Dial Charts
The Dial Chart is used to indicate the current value of a metric on a given range. Although similar to a Bullet Chart, it displays the values in the form of a semi-dial. You can specify qualitative ranges in Dial Charts as well.

Zoho Analytics offers the following types of dial charts:

Simple: The simple dial chart is a basic dial chart consisting of the chart range, target, key metric plot, and its value.



Speedometer: The speedometer is a type of dial chart that comes with an indicator to mark the position of the key metric value in a given range. By default, the qualitative ranges in the speedometer are NOT of the same hues. The color red, yellow, and green indicates your performance range.



Conditional: In a conditional dial chart, the color of your key metric plot is defined based on conditions. This will help you categorize the key metric values into different qualitative baskets.



Say, you want to measure the progress of your sales in a month. You can provide a color to be displayed as the default color and colors to represent the sales when reaching the 25% and 50% of the overall sales range. The default color will be the color of the key metric plot when the sales value is more than 50%.



The bullet chart and dial chart will help measure your current value, compared to your target value.

Refer to the following presentation to create a Dial Chart widget.



Full Dial Chart
Full Dial Chart is a gauge chart with a full ring. This is similar to the Dial Chart. The Maximum Range value will be set as the value of the full ring.



You can customize the view of the full dial chart by plotting the key metric plot to overlap the dial, outside the dial, or inside the dial.



Refer to the following presentation to create a Full Dial Chart widget.



Adding Descriptive Tooltip
Zoho Analytics allows you to equip widgets with an informational tooltip. This is achieved by enabling an information icon and providing a concise description.

To add informational tooltip to your widgets:

Access the KPI Widget Editor.
Navigate to the Settings tab and select the Values section.

Enable the Widget Info checkbox. This activates the info icon to your widget.
In the Description box, enter a description for your widget (less than 250 characters).

Once finalized close the widget editor. In View Mode, users can hover their cursor over the new info icon on the widget to read your description as a tooltip.

Drill Through in Widgets
Zoho Analytics allows you to link widgets to related reports or dashboards, enabling users to drill through for deeper insights. This is achieved by enabling the Drill Through option and configuring the target reports or dashboards.

To add Drill Through to your widgets:

Access the KPI Widget Editor.
Navigate to the Settings tab and select the Drill section.
Enable the Drill Through checkbox. This activates the drill through option for your widget.

In the report/dashboard selection panel, choose the target reports or dashboards you want to link to. All the dashboards and the reports relevant to the current widget will be listed, and you can link up to 20 per widget.

Use the Remove All option to unlink all configured reports and dashboards from the widget at once.
Once finalized, close the widget editor.
In View Mode, users can click on the widget to view the list of linked reports and dashboards and navigate to them directly. If the widget has date columns or dimensional filters configured, they will automatically be passed as criteria when opening the target.

Note:

If the widget has only a measure and no dimensions, the drill-through action will open the selected report/dashboard without any criteria.
Ex: A widget with just Sales(Sum) or Sales(Avg) in the Data Column without any Group by column.
If a linked report or dashboard is deleted or access is revoked, it will be automatically removed from the drill through list.
Resetting the widget will restore it to its previous state, including any drill through configuration.
KPI Widgets with Forecast
KPIs are beneficial to measure the progress towards your goals. By combining KPIs with forecasting, you can get a better understanding of how close you are to your goals, based on your current data trend. 



KPI Widgets with Images
Images help process information far more efficiently than numbers and lengthy text descriptions. They also improve the visual appeal and aesthetics of the dashboard, and result in increased engagement and attention span from the users.

Zoho Analytics allows you to incorporate images to the widgets in the dashboard. This can be done in two ways in Zoho Analytics.

Static Images in Widgets: These images are used to primarily indicate the type of data, and the information contained in the widget. The images do not change based on data fluctuations.
Dynamic Images in Widgets: In this method, the data values are grouped by the Image column, resulting in images changing dynamically based on the groupings defined by the data in that column. 
Creating Widgets with Static Images
Open the dashboard in Edit mode and click the Widget button.
Choose the suitable Widget Type.

Choose the Data Column for computing and the column to be used for Group By.
Access the Settings tab for widgets and click Image.

Click Choose Image. You can upload a locally stored image, gif or an image URL.
Customize the Image Position and Image Size. By default, the image is positioned at the center.
The Navigation bar below the Preview section provides the following customization options:
Easily change the color of the image to suit the dashboard color theme. You can also apply the Font color to the image.



Adjust the Contrast, Brightness, and Transparency to enhance visibility of the image.

Include Stroke and Shadow to make the images more prominent.

Use the Rotate and Flip options to change the orientation for better alignment and fitting within the dashboard layout.

Click Apply.
Creating Widgets with Dynamic Images
To create widgets with images,

You need a column that has the images (URLs of image addresses).
Each image's size should not exceed 200KB.
The Display as option under the Format Column menu must be set to Image.
The below presentation shows how to create widgets with images



Modifying Labels/Text in KPI Widgets
Zoho Analytics allows you to customize the Labels and Value for widgets. You can either leave it empty, enter a data, or add a dynamic label using a parameterized format. The following are the supported formats to add a dynamic label. Same parameter will retrieve  different data based on the options set in the Show Value As option. 

${ColumnName}.LABEL -  Displays the column name or the label that meets the value of the CALCULATION applied over the column.
${ColumnName}.VALUE - Displays the value derived from the CALCULATION applied over the column.
${OPERATION} - Displays the advanced summary function applied in Show Value As field.
${PERCENTAGE} - Displays the percentage of Value (Only for Full Dial).
${MAXVALUE} - Displays the maximum value of the chart (Only for Full Dial).
To edit the text in your KPI widget, follow the below steps:

Click the edit icon that appears on mouse-over your widget.

Navigate to the Settings tab. Modify the text to be added in the Label field under the Primary Value and Secondary Values section. The changes are updated automatically.