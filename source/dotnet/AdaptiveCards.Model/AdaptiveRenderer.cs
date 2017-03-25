using Adaptive;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adaptive
{
    public abstract class AdaptiveRenderer<TUIElement, TContext>
    {
        // containers
        protected abstract TUIElement RenderCardElement(CardElement cardElement, TContext context);
        protected abstract TUIElement RenderAdaptiveCard(AdaptiveCard card, TContext context);
        protected abstract TUIElement RenderContainer(Container container, TContext context);
        protected abstract TUIElement RenderColumnSet(ColumnSet columnSet, TContext context);
        protected abstract TUIElement RenderColumn(Column column, TContext context);
        protected abstract TUIElement RenderFactSet(FactSet factSet, TContext context);
        protected abstract TUIElement RenderImageSet(ImageSet imageSet, TContext context);

        // elements
        protected abstract TUIElement RenderTextBlock(TextBlock textBlock, TContext context);
        protected abstract TUIElement RenderImage(Image image, TContext context);
        protected abstract Tuple<TUIElement, TUIElement> RenderFact(Fact fact, TContext context);

        // input
        protected abstract TUIElement RenderInputText(InputText inputText, TContext context);
        protected abstract TUIElement RenderInputDate(InputDate inputDate, TContext context);
        protected abstract TUIElement RenderInputNumber(InputNumber inputNumber, TContext context);
        protected abstract TUIElement RenderInputTime(InputTime inputTime, TContext context);
        protected abstract TUIElement RenderInputToggle(InputToggle inputToggle, TContext context);
        protected abstract TUIElement RenderInputChoiceSet(InputChoiceSet choiceSet, TContext context);

        // actions
        protected abstract TUIElement RenderAction(ActionBase action, TContext context);
        protected abstract TUIElement RenderActionHttp(ActionHttp action, TContext context);
        protected abstract TUIElement RenderActionSubmit(ActionSubmit action, TContext context);
        protected abstract TUIElement RenderActionOpenUrl(ActionOpenUrl action, TContext context);
        protected abstract TUIElement RenderActionShowCard(ActionShowCard action, TContext context);
    }
}
