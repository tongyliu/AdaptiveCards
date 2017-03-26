using System;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Xml;
using MarkedNet;
using Xceed.Wpf.Toolkit;

namespace AdaptiveCards.Renderers
{
    public partial class XamlRenderer
        : AdaptiveRenderer<FrameworkElement, RenderContext>
    {

        /// <summary>
        /// Input.Text
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        protected override FrameworkElement RenderInputText(InputText input, RenderContext context)
        {
            if (this.Options.SupportInteraction)
            {
                var textBox = new WatermarkTextBox() { Text = input.Value };
                if (input.IsMultiline == true)
                {
                    textBox.AcceptsReturn = true;
                    textBox.TextWrapping = TextWrapping.Wrap;
                    textBox.HorizontalScrollBarVisibility = ScrollBarVisibility.Disabled;
                }
                if (input.MaxLength > 0)
                    textBox.MaxLength = input.MaxLength;

                textBox.Watermark = input.Placeholder;
                textBox.Style = this.GetStyle($"Adaptive.Input.Text.{input.Style}");
                textBox.DataContext = input;
                context.InputControls.Add(textBox);
                return textBox;
            }
            else
            {

                var textBlock = new TextBlock() { Text = GetFallbackText(input) ?? input.Placeholder };
                return RenderTextBlock(textBlock, context);
            }

        }
    }
}