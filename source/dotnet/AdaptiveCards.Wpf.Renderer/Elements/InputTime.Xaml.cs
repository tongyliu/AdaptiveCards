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

namespace Adaptive.Renderers
{
    public partial class XamlRenderer
        : AdaptiveRenderer<FrameworkElement, RenderContext>
    {

        /// <summary>
        /// Input.Time
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        protected override FrameworkElement RenderInputTime(InputTime input, RenderContext context)
        {

            if (this.Options.SupportInteraction)
            {
                var timePicker = new TimePicker();
                DateTime value;
                if (DateTime.TryParse(input.Value, out value))
                    timePicker.Value = value;
                TimeSpan minValue;
                if (TimeSpan.TryParse(input.Min, out minValue))
                    timePicker.EndTime = minValue;
                TimeSpan maxValue;
                if (TimeSpan.TryParse(input.Max, out maxValue))
                    timePicker.EndTime = maxValue;
                timePicker.Watermark = input.Placeholder;
                timePicker.Style = this.GetStyle("Adaptive.Input.Time");
                timePicker.DataContext = input;
                context.InputControls.Add(timePicker);
                return timePicker;
            }
            else
            {
                var textBlock = new TextBlock() { Text = GetFallbackText(input) ?? input.Placeholder };
                return RenderTextBlock(textBlock, context);
            }

        }
    }
}