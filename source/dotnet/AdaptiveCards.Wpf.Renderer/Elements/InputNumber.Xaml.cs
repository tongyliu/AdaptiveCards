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
        /// Input.Number
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        protected override FrameworkElement RenderInputNumber(InputNumber input, RenderContext context)
        {
            if (this.Options.SupportInteraction)
            {

                IntegerUpDown numberPicker = new IntegerUpDown();
                // numberPicker.ShowButtonSpinner = true;

                float value;
                if (float.TryParse(input.Value, out value))
                    numberPicker.Value = Convert.ToInt32(value);

                float minValue;
                if (float.TryParse(input.Min, out minValue))
                    numberPicker.Minimum = Convert.ToInt32(minValue);

                float maxValue;
                if (float.TryParse(input.Max, out maxValue))
                    numberPicker.Maximum = Convert.ToInt32(maxValue);

                numberPicker.Watermark = input.Placeholder;
                numberPicker.Style = this.GetStyle("Adaptive.Input.Number");
                numberPicker.DataContext = input;
                context.InputControls.Add(numberPicker);
                return numberPicker;
            }
            else
            {
                var textBlock = new TextBlock() { Text = GetFallbackText(input) ?? input.Placeholder };
                return RenderTextBlock(textBlock, context);
            }

        }
    }
}