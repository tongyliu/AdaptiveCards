using System;

#if WPF
using UI = System.Windows.Controls;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using MarkedNet;
using Xceed.Wpf.Toolkit;
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

#if WPF
            uiImage.Source = new BitmapImage(new Uri(this.Url));
                        System.Windows.HorizontalAlignment alignment;
            if (Enum.TryParse<System.Windows.HorizontalAlignment>(this.HorizontalAlignment.ToString(), out alignment))
                uiImage.HorizontalAlignment = alignment;
#elif Xamarin
            uiImage.Source = ImageSource.FromUri(new Uri(this.Url));
            switch (HorizontalAlignment)
            {
                case HorizontalAlignment.Left:
                    uiImage.HorizontalOptions = LayoutOptions.Start; ;
                    break;

                case HorizontalAlignment.Center:
                    uiImage.HorizontalOptions = LayoutOptions.Center;
                    break;

                case HorizontalAlignment.Right:
                    uiImage.HorizontalOptions = LayoutOptions.End; ;
                    break;

                default:
                    uiImage.HorizontalOptions = LayoutOptions.FillAndExpand; //images fill available width
                    break;
            }

#endif
            string style = $"Adaptive.Image";
            if (this.Size != ImageSize.Auto)
                style += $".{this.Size.ToString()}";

            if (this.Style == ImageStyle.Person)
                style += $".{this.Style.ToString()}";
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