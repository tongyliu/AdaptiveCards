using System;
using System.Windows;
using System.Threading.Tasks;

#if WPF
using System.Windows.Controls;
using UI = System.Windows.Controls;
#elif Xamarin
using Xamarin.Forms;
using UI = Xamarin.Forms;
#endif

namespace Adaptive
{
    public partial class FactSet
    {
        /// <summary>
        /// Override the renderer for this element
        /// </summary>
        public static Func<FactSet, RenderContext, FrameworkElement> AlternateRenderer;

        /// <summary>
        /// FactSet
        /// </summary>
        /// <param name="factSet"></param>
        /// <returns></returns>
        public override FrameworkElement Render(RenderContext context)
        {
            if (AlternateRenderer != null)
                return AlternateRenderer(this, context);

            var uiFactSet = new Grid();
            // grid.Margin = this.Theme.FactSetMargins;
            uiFactSet.Style = context.GetStyle("Adaptive.FactSet");

            uiFactSet.ColumnDefinitions.Add(new ColumnDefinition() { Width = GridLength.Auto });
            uiFactSet.ColumnDefinitions.Add(new ColumnDefinition() { Width = GridLength.Auto });
            int iRow = 0;
            foreach (var fact in this.Facts)
            {
                Tuple<FrameworkElement, FrameworkElement> uiElements = fact.Render(context);
                uiFactSet.RowDefinitions.Add(new RowDefinition() { Height = GridLength.Auto });

                Grid.SetColumn(uiElements.Item1, 0);
                Grid.SetRow(uiElements.Item1, iRow);
                uiFactSet.Children.Add(uiElements.Item1);

                Grid.SetColumn(uiElements.Item2, 1);
                Grid.SetRow(uiElements.Item2, iRow++);
                uiFactSet.Children.Add(uiElements.Item2);
            }
            return uiFactSet;
        }


        public override Task PreRender()
        {
            return Task.Delay(0);
        }

    }

    public partial class Fact
    {
        /// <summary>
        /// Fact
        /// </summary>
        /// <param name="fact"></param>
        /// <returns></returns>
        public virtual Tuple<FrameworkElement, FrameworkElement> Render(RenderContext context)
        {
            return new Tuple<FrameworkElement, FrameworkElement>(
                new UI.TextBlock()
                {
                    Text = this.Title,
                    Style = context.GetStyle("Adaptive.Fact.Name")
                },
                new UI.TextBlock()
                {
                    Text = this.Value,
                    Style = context.GetStyle("Adaptive.Fact.Value")
                }
            );
        }
    }
}