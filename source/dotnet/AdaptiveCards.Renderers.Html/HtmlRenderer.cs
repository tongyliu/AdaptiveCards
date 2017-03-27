using HtmlTags;
using MarkedNet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdaptiveCards.Renderers
{
    /// <summary>
    /// Render as texthtml suitable for server side generation
    /// </summary>
    public class HtmlRenderer : AdaptiveRenderer<HtmlTag, object>
    {

        public HtmlRenderer(RenderOptions options) : base(options)
        {
        }

        public HtmlTag RenderAdaptiveCard(AdaptiveCard card)
        {
            return Render(card, null);
        }

        public HtmlTag RenderShowCard(ActionShowCard showCard)
        {
            return Render(showCard.Card, null);
        }

        protected override HtmlTag Render(ActionHttp action, object context)
        {
            return null;
        }

        protected override HtmlTag Render(ActionOpenUrl action, object context)
        {
            return null;
        }

        protected override HtmlTag Render(ActionShowCard action, object context)
        {
            return null;
        }

        protected override HtmlTag Render(ActionSubmit action, object context)
        {
            return null;
        }

        protected override HtmlTag Render(AdaptiveCard card, object context)
        {
            var uiCard = new DivTag()
                .AddClass(card.Type)
                .Style("border-width", "1px 1px 1px 3px")
                .Style("border-style", "solid")
                .Style("border-color", "rgb(241, 241, 241)");

            if (card.BackgroundImage != null)
            {
                uiCard = uiCard.Style("background-image", $"url('{card.BackgroundImage}')")
                    .Style("background-repeat", "no-repeat")
                    .Style("background-size", "cover");
            }

            AddContainerElements(uiCard, card.Body, card.Actions, context);

            return uiCard;
        }

        protected void AddContainerElements(HtmlTag uiContainer, List<CardElement> elements, List<ActionBase> actions, object context)
        {
            foreach (var cardElement in elements)
            {
                // each element has a row
                HtmlTag uiElement = this.Render(cardElement, context);
                if (uiElement != null)
                {
                    if (uiContainer.Children.Any())
                    {
                        switch (cardElement.Separation)
                        {
                            case SeparationStyle.None:
                                uiElement = uiElement.AddClass("NoSeparation");
                                break;
                            case SeparationStyle.Default:
                                break;
                            case SeparationStyle.Strong:
                                {
                                    uiElement = uiElement.AddClass("NoSeparation");
                                    var uiSep = new DivTag()
                                        .AddClass("Separator");
                                    uiContainer.Children.Add(uiSep);
                                }
                                break;
                        }

                    }
                    else
                    {
                        uiElement = uiElement.AddClass("NoSeparation");
                    }
                    uiContainer.Children.Add(uiElement);
                }
            }

            if (this.Options.SupportInteraction && actions?.Any() == true)
            {
                //var uiActionBar = new UniformGrid();
                //uiActionBar.Rows = 1;
                //uiActionBar.HorizontalAlignment = System.Windows.HorizontalAlignment.Right;
                //uiActionBar.VerticalAlignment = System.Windows.VerticalAlignment.Bottom;

                //int iCol = 0;
                //foreach (var action in actions)
                //{
                //    // add actions
                //    var uiAction = this.RenderAction(action, context);
                //    if (uiAction != null)
                //    {
                //        Grid.SetColumn(uiAction, iCol++);
                //        uiActionBar.Children.Add(uiAction);
                //    }
                //}
                //uiActionBar.Style = this.GetStyle("Adaptive.Actions");
                //grid.RowDefinitions.Add(new RowDefinition() { Height = GridLength.Auto });
                //Grid.SetRow(uiActionBar, grid.RowDefinitions.Count - 1);
                //grid.Children.Add(uiActionBar);
            }
        }


        protected override HtmlTag Render(Column column, object context)
        {
            var uiColumn = new DivTag()
                .AddClass(column.Type);

            AddContainerElements(uiColumn, column.Items, column.Actions, context);

            if (this.Options.SupportInteraction && column.SelectAction != null)
            {
                //var uiButton = (Button)RenderAction(container.SelectAction, new RenderContext(this.actionCallback, this.missingDataCallback));
                //if (uiButton != null)
                //{
                //    uiButton.Content = uiContainer;
                //    uiButton.Style = this.GetStyle("Adaptive.Action.Tap");
                //    return uiButton;
                //}
            }

            return uiColumn;
        }

        protected override HtmlTag Render(ColumnSet columnSet, object context)
        {
            var uiColumnSet = new DivTag()
                .AddClass(columnSet.Type)
                .Style("overflow", "hidden")
                .Style("display", "flex");

            double max = Math.Max(1.0, columnSet.Columns.Select(col =>
            {
                if (double.TryParse(col.Size ?? "0", out double val))
                    return val;
                return 0;
            }).Sum());

            foreach (var column in columnSet.Columns)
            {
                var uiColumn = this.Render(column, context);

                // Add vertical Seperator
                if (uiColumnSet.Children.Any())
                {
                    switch (column.Separation)
                    {
                        case SeparationStyle.None:
                            break;

                        case SeparationStyle.Default:
                            {
                                uiColumnSet.Children.Add(new DivTag()
                                    .AddClass("ColumnSeparator")
                                    .AddClass("Default")
                                    .Style("flex", "0 0 auto"));
                            }
                            break;

                        case SeparationStyle.Strong:
                            {
                                uiColumnSet.Children.Add(new DivTag()
                                    .AddClass("ColumnSeparator")
                                    .AddClass("Strong")
                                    .Style("flex", "0 0 auto"));
                            }
                            break;
                    }
                }

                // do some sizing magic 
                var size = column.Size?.ToLower();
                if (size == null || size == ColumnSize.Stretch.ToLower())
                    uiColumn = uiColumn.Style("flex", "1 1 auto");
                else if (size == ColumnSize.Auto.ToLower())
                    uiColumn = uiColumn.Style("flex", "0 0 auto");
                else
                {
                    double val;
                    if (double.TryParse(size, out val))
                    {
                        var percent = Convert.ToInt32(100*(val / max));
                        uiColumn = uiColumn.Style("flex", $"1 1 {percent}%");
                    }
                    else
                        uiColumn = uiColumn.Style("flex", "0 0 auto");
                }

                uiColumnSet.Children.Add(uiColumn);
            }

            return uiColumnSet;
        }

        protected override HtmlTag Render(Container container, object context)
        {
            var uiContainer = new DivTag()
                .AddClass(container.Type);

            AddContainerElements(uiContainer, container.Items, container.Actions, context);

            if (this.Options.SupportInteraction && container.SelectAction != null)
            {
                //var uiButton = (Button)RenderAction(container.SelectAction, new RenderContext(this.actionCallback, this.missingDataCallback));
                //if (uiButton != null)
                //{
                //    uiButton.Content = uiContainer;
                //    uiButton.Style = this.GetStyle("Adaptive.Action.Tap");
                //    return uiButton;
                //}
            }

            return uiContainer;
        }

        protected override Tuple<HtmlTag, HtmlTag> Render(Fact fact, object context)
        {
            return new Tuple<HtmlTag, HtmlTag>(new DivTag().Text(fact.Title).AddClass("FactName").AddClass("NoSeparation"),
                                               new DivTag().Text(fact.Value).AddClass("FactTitle").AddClass("NoSeparation"));
        }

        protected override HtmlTag Render(FactSet factSet, object context)
        {
            var uiFactSet = (TableTag)new TableTag()
                .AddClass(factSet.Type)
                .Style("overflow", "hidden");

            foreach (var fact in factSet.Facts)
            {
                var uiElements = Render(fact, context);
                var uiRow = uiFactSet.AddBodyRow();
                uiRow.Cell().AddClass("FactName").Append(uiElements.Item1);
                uiRow.Cell().AddClass("FactValue").Append(uiElements.Item2);
            }
            return uiFactSet;
        }

        protected override HtmlTag Render(TextBlock textBlock, object context)
        {
            var uiTextBlock = new DivTag()
                .AddClass(textBlock.Type)
                .Style("text-align", textBlock.HorizontalAlignment.ToString().ToLower())
                .Style("overflow", "hidden");

            if (textBlock.Color != TextColor.Default)
            {
                uiTextBlock = uiTextBlock.AddClass($"{textBlock.Color}");
            }
            if (textBlock.Weight != TextWeight.Normal)
            {
                uiTextBlock = uiTextBlock.AddClass($"{textBlock.Weight}");
            }
            if (textBlock.Size != TextSize.Normal)
            {
                uiTextBlock = uiTextBlock.AddClass($"{textBlock.Size}");
            }

            if (textBlock.Wrap == false)
            {
                uiTextBlock = uiTextBlock
                    .Style("white-space", "nowrap")
                    .Style("text-overflow", "ellipsis");
            }

            if (textBlock.IsSubtle)
            {
                uiTextBlock = uiTextBlock.AddClass("Subtle");
            }

            Marked marked = new Marked();
            marked.Options.Mangle = false;
            marked.Options.Sanitize = true;

            string html = marked.Parse(RendererUtilities.ApplyTextFunctions(textBlock.Text)).Replace("<p>", "<p style='margin-top: 0px;margin-bottom: 0px'>");
            var uiPara = new LiteralTag(html)
                .Style("margin-top", "0px")
                .Style("margin-bottom", "0px");
            uiTextBlock.Children.Add(uiPara);
            return uiTextBlock;
        }

        protected override HtmlTag Render(Image image, object context)
        {
            var uiImage = new HtmlTag("img")
                .AddClass(image.Type)
                .AddClass($"{image.Size}")
                .AddClass($"{image.Style}")
                .Attr("src", image.Url);

            switch (image.HorizontalAlignment)
            {
                case HorizontalAlignment.Left:
                    uiImage = uiImage.Style("overflow", "hidden")
                        .Style("display", "block");
                    break;
                case HorizontalAlignment.Center:
                    uiImage = uiImage.Style("overflow", "hidden")
                        .Style("margin-right", "auto")
                        .Style("margin-left", "auto")
                        .Style("display", "block");
                    break;
                case HorizontalAlignment.Right:
                    uiImage = uiImage.Style("overflow", "hidden")
                        .Style("margin-left", "auto")
                        .Style("display", "block");
                    break;
            }

            if (this.Options.SupportInteraction && image.SelectAction != null)
            {
                //var uiButton = (Button)RenderAction(image.SelectAction, context);
                //if (uiButton != null)
                //{
                //    uiButton.Content = uiImage;
                //    uiButton.Style = this.GetStyle("Adaptive.Action.Tap");
                //    return uiButton;
                //}
            }
            return uiImage;
        }

        protected override HtmlTag Render(ImageSet imageSet, object context)
        {
            var uiImageSet = new DivTag()
                .AddClass(imageSet.Type);

            foreach (var image in imageSet.Images)
            {
                var uiImage = this.Render(image, context);
                if (imageSet.ImageSize != ImageSize.Auto)
                {
                    uiImage = uiImage.RemoveClass(ImageSize.Auto.ToString())
                        .RemoveClass($"{ImageSize.Stretch}")
                        .RemoveClass($"{ImageSize.Small}")
                        .RemoveClass($"{ImageSize.Medium}")
                        .RemoveClass($"{ImageSize.Large}")
                        .AddClass($"{imageSet.ImageSize}");
                }
                uiImageSet.Children.Add(uiImage);
            }
            return uiImageSet;
        }

        protected override HtmlTag Render(InputChoiceSet choiceSet, object context)
        {
            return null;
        }

        protected override HtmlTag Render(InputDate inputDate, object context)
        {
            return null;
        }

        protected override HtmlTag Render(InputNumber inputNumber, object context)
        {
            return null;
        }

        protected override HtmlTag Render(InputText inputText, object context)
        {
            return null;
        }

        protected override HtmlTag Render(InputTime inputTime, object context)
        {
            return null;
        }

        protected override HtmlTag Render(InputToggle inputToggle, object context)
        {
            return null;
        }

    }
}
