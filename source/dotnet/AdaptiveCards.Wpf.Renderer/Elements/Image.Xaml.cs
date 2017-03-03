using System;

#if WPF
using System.Windows;
using UI = System.Windows.Controls;
using System.Windows.Media.Imaging;

#elif Xamarin
using Xamarin.Forms;
using UI = Xamarin.Forms;
#endif

namespace Adaptive
{
    public partial class Image
    {
        /// <summary>
        /// Override the renderer for this element
        /// </summary>
        public static Func<Image, RenderContext, FrameworkElement> AlternateRenderer;

        /// <summary>
        /// Image
        /// </summary>
        /// <param name="image"></param>
        /// <returns></returns>
        public override FrameworkElement Render(RenderContext context)
        {
            if (AlternateRenderer != null)
                return AlternateRenderer(this, context);

            var uiImage = new UI.Image();

            uiImage.SetSource(new Uri(Url));
            uiImage.SetHorizontalAlignment(HorizontalAlignment);

            string style = $"Adaptive.Image";
            if (this.Size != ImageSize.Auto)
                style += $".{this.Size}";

            if (this.Style == ImageStyle.Person)
                style += $".{this.Style}";
            uiImage.Style = context.GetStyle(style);

            // TODO: selectAction
            //if (this.SelectAction != null)
            //{
            //    var uiButton = (Button)this.SelectAction.Render(context.NewActionContext());
            //    uiButton. = uiImage;
            //    uiButton.Style = context.GetStyle("Adaptive.Action.Tap");
            //    return uiButton;
            //}
            return uiImage;
        }
    }
}