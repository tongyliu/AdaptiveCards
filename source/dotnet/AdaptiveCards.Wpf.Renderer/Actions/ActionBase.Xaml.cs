using System.Windows;
#if WPF
using System.Windows.Controls;
using xaml = System.Windows.Controls;
#elif Xamarin
using Xamarin.Forms;
using Button = AdaptiveCards.XamarinForms.Renderer.ContentButton;
#endif
using Newtonsoft.Json.Linq;
using System;

namespace Adaptive
{

    public partial class ActionBase
    {
        protected Button CreateActionButton(RenderContext renderContext)
        {
#if Xamarin
            var uiButton = new Button();
            var uiTitle = new Label { Text = this.Title };
            uiTitle.Style = renderContext.GetStyle($"Adaptive.Action.Title");
            uiButton.Content = uiTitle;
            string name = this.GetType().Name.Replace("Action", String.Empty);
            uiButton.Style = renderContext.GetStyle($"Adaptive.Action.{name}");
            return uiButton;
#elif WPF
            var uiButton = new Button();
            xaml.TextBlock uiTitle = new xaml.TextBlock() { Text = this.Title };
            uiTitle.Style = renderContext.GetStyle($"Adaptive.Action.Title");
            uiButton.Content = uiTitle;
            string name = this.GetType().Name.Replace("Action", String.Empty);
            uiButton.Style = renderContext.GetStyle($"Adaptive.Action.{name}");
            return uiButton;

#endif
        }
    }
}