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
using AdaptiveCards;

namespace AdaptiveCards.Renderers
{

    public partial class XamlRenderer 
        : AdaptiveRenderer<FrameworkElement, RenderContext>
    {

        protected override FrameworkElement RenderAction(ActionBase action, RenderContext context)
        {
            if (action is ActionSubmit)
                return this.RenderActionSubmit((ActionSubmit)action, context);
            if (action is ActionHttp)
                return this.RenderActionHttp((ActionHttp)action, context);
            if (action is ActionOpenUrl)
                return this.RenderActionOpenUrl((ActionOpenUrl)action, context);
            if (action is ActionShowCard)
                return this.RenderActionShowCard((ActionShowCard)action, context);
            return null;
        }

        protected Button CreateActionButton(ActionBase action, RenderContext renderContext)
        {
#if Xamarin
            var uiButton = new Button();
            var uiTitle = new Label { Text = this.Title };
            uiTitle.Style = this.GetStyle($"Adaptive.Action.Title");
            uiButton.Content = uiTitle;
            string name = this.GetType().Name.Replace("Action", String.Empty);
            uiButton.Style = this.GetStyle($"Adaptive.Action.{name}");
            return uiButton;
#elif WPF
            var uiButton = new Button();
            xaml.TextBlock uiTitle = new xaml.TextBlock() { Text = action.Title };
            uiTitle.Style = this.GetStyle($"Adaptive.Action.Title");
            uiButton.Content = uiTitle;
            string name = this.GetType().Name.Replace("Action", String.Empty);
            uiButton.Style = this.GetStyle($"Adaptive.Action.{name}");
            return uiButton;
#endif
        }
    }
}