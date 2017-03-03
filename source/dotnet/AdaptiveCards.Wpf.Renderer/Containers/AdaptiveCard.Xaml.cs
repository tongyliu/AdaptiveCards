using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
#if WPF
using System.Windows.Controls;
using WPF = System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Media;
using System.Windows.Media.Imaging;
#elif Xamarin
using Xamarin.Forms;
#endif

namespace Adaptive
{
    public partial class AdaptiveCard
    {

        /// <summary>
        /// Override the renderer for this element
        /// </summary>
        public static Func<AdaptiveCard, RenderContext, FrameworkElement> AlternateRenderer;

        /// <summary>
        /// AdaptiveCard
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override FrameworkElement Render(RenderContext context)
        {
            if (AlternateRenderer != null)
                return AlternateRenderer(this, context);

            var grid = new Grid();
            grid.Style = context.GetStyle("Adaptive.Card");
            if (this.BackgroundImage != null)
            {
                var uri = new Uri(this.BackgroundImage);
                grid.SetBackgroundImage(uri);
            }
            grid.ColumnDefinitions.Add(new ColumnDefinition() { Width = new GridLength(1, GridUnitType.Star) });

            var inputControls = new List<FrameworkElement>();
            Container.AddContainerElements(grid, this.Body, this.Actions, context);
            return grid;
        }
    }
}