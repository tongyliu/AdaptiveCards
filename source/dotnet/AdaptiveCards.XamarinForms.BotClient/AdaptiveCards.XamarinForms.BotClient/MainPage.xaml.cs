using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Adaptive;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace AdaptiveCards.XamarinForms.BotClient
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private string json = @"{
	""$schema"":""https://microsoft.github.io/AdaptiveCards/schemas/adaptive-card.json"",
    ""type"": ""AdaptiveCard"",
    ""body"": [
        {
            ""type"": ""TextBlock"",
            ""text"": ""This is the first line""
        },
        {
            ""type"": ""TextBlock"",
            ""text"": ""This is the second line""
        }
    ]
}";

        private string cardStr = @"
{
	""type"": ""AdaptiveCard"",
	""body"": [
		{
			""type"": ""Container"",
			""speak"": ""<s>Card created by Miguel Garcia: Publish Adaptive Card schema</s>"",
			""items"": [
				{
					""type"": ""TextBlock"",
					""text"": ""Card created: Publish Adaptive Card schema"",
					""weight"": ""bolder"",
					""size"": ""medium""
				},
				{
					""type"": ""ColumnSet"",
					""columns"": [
						{
							""type"": ""Column"",
							""size"": ""auto"",
							""items"": [
								{
									""type"": ""Image"",
									""url"": ""http://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg"",
									""size"": ""small"",
									""style"": ""person""
								}
							]
						},
						{
							""type"": ""Column"",
							""size"": ""stretch"",
							""items"": [
								{
									""type"": ""TextBlock"",
									""text"": ""**Miguel Garcia**"",
									""wrap"": true
								},
								{
									""type"": ""TextBlock"",
									""text"": ""Created {{DATE(2017-02-14T06:08:39Z,Long)}} {{TIME(2017-02-14T06:08:39Z)}}"",
									""isSubtle"": true,
									""wrap"": true
								}
							]
						}
					]
				}
			]
		},
		{
			""type"": ""Container"",
			""items"": [
				{
					""type"": ""TextBlock"",
					""text"": ""Now that we have define the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation."",
					""speak"": """",
					""wrap"": true
				},
				{
					""type"": ""FactSet"",
					""speak"": ""It has been assigned to: David Claux"",
					""facts"": [
						{
							""title"": ""Board:"",
							""value"": ""Adaptive Card""
						},
						{
							""title"": ""List:"",
							""value"": ""Backlog""
						},
						{
							""title"": ""Assigned to:"",
							""value"": ""David Claux""
						},
						{
							""title"": ""Due date:"",
							""value"": ""Not set""
						}
					]
				}
			],
			""actions"": [
				{
					""type"": ""Action.OpenUrl"",
					""title"": ""View"",
					""url"": ""http://foo.com""
				}
			]
		}
	]
}";


        protected override void OnAppearing()
        {
            base.OnAppearing();
            var context = new RenderContext(Application.Current.Resources);

            var card = JsonConvert.DeserializeObject<AdaptiveCard>(cardStr);
            var result = card.Render(context);

            Test.Children.Add(result);
        }
    }
}
