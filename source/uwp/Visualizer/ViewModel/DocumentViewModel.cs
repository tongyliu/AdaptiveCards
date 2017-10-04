﻿using AdaptiveCards.Uwp;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.Data.Json;
using Windows.Storage;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using AdaptiveCardVisualizer.Helpers;
using AdaptiveCardVisualizer.ResourceResolvers;

namespace AdaptiveCardVisualizer.ViewModel
{
    public class DocumentViewModel : GenericDocumentViewModel
    {
        private static AdaptiveCardRenderer _renderer;

        private DocumentViewModel(MainPageViewModel mainPageViewModel) : base(mainPageViewModel) { }

        private UIElement _renderedCard;
        public UIElement RenderedCard
        {
            get { return _renderedCard; }
            private set { SetProperty(ref _renderedCard, value); }
        }

        public static async Task<DocumentViewModel> LoadFromFileAsync(MainPageViewModel mainPageViewModel, IStorageFile file, string token)
        {
            var answer = new DocumentViewModel(mainPageViewModel);
            await answer.LoadFromFileAsync(file, token, assignPayloadWithoutLoading: true);
            return answer;
        }

        public static DocumentViewModel LoadFromPayload(MainPageViewModel mainPageViewModel, string payload)
        {
            return new DocumentViewModel(mainPageViewModel)
            {
                _payload = payload
            };
        }

        protected override async void LoadPayload(string payload)
        {
            var newErrors = await PayloadValidator.ValidateAsync(payload);
            if (newErrors.Any(i => i.Type == ErrorViewModelType.Error))
            {
                MakeErrorsLike(newErrors);
                return;
            }

            try
            {
                if (_renderer == null)
                {
                    InitializeRenderer(MainPageViewModel.HostConfigEditor.HostConfig);
                }
            }
            catch (Exception ex)
            {
                newErrors.Add(new ErrorViewModel()
                {
                    Message = "Initializing renderer error: " + ex.ToString(),
                    Type = ErrorViewModelType.Error
                });
                MakeErrorsLike(newErrors);
                return;
            }

            try
            {
                JsonObject jsonObject;
                if (JsonObject.TryParse(payload, out jsonObject))
                {
                    RenderedAdaptiveCard renderResult = _renderer.RenderAdaptiveCardFromJson(jsonObject);
                    if (renderResult.FrameworkElement != null)
                    {
                        RenderedCard = renderResult.FrameworkElement;
                        renderResult.Action += async (sender, e) =>
                        {
                            var m_actionDialog = new ContentDialog();

                            if (e.Action.ActionType == ActionType.ShowCard)
                            {
                                AdaptiveShowCardAction showCardAction = (AdaptiveShowCardAction)e.Action;
                                RenderedAdaptiveCard renderedShowCard = _renderer.RenderAdaptiveCard(showCardAction.Card);
                                if (renderedShowCard.FrameworkElement != null)
                                {
                                    m_actionDialog.Content = renderedShowCard.FrameworkElement;
                                }
                            }
                            else
                            {
                                m_actionDialog.Content = SerializeActionEventArgsToString(e);
                            }

                            m_actionDialog.PrimaryButtonText = "Close";

                            await m_actionDialog.ShowAsync();
                        };
                    }
                    else
                    {
                        newErrors.Add(new ErrorViewModel()
                        {
                            Message = "There was an error Rendering this card",
                            Type = ErrorViewModelType.Error
                        });
                    }
                }
                else
                {
                    newErrors.Add(new ErrorViewModel()
                    {
                        Message = "There was an error creating a JsonObject from the card",
                        Type = ErrorViewModelType.Error
                    });
                }

                if (RenderedCard is FrameworkElement)
                {
                    (RenderedCard as FrameworkElement).VerticalAlignment = VerticalAlignment.Top;
                }
                MakeErrorsLike(newErrors);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
                newErrors.Add(new ErrorViewModel()
                {
                    Message = "Rendering failed",
                    Type = ErrorViewModelType.Error
                });
                MakeErrorsLike(newErrors);
            }
        }

        public string SerializeActionEventArgsToString(AdaptiveActionEventArgs args)
        {
            string answer = "Action invoked!";

            answer += "\nType: " + args.Action.ActionType;

            if (args.Action is AdaptiveSubmitAction)
            {
                answer += "\nData: " + (args.Action as AdaptiveSubmitAction).DataJson.Stringify();
            }
            else if (args.Action is AdaptiveOpenUrlAction)
            {
                answer += "\nUrl: " + (args.Action as AdaptiveOpenUrlAction).Url;
            }

            answer += "\nInputs: " + args.Inputs.Stringify();

            return answer;
        }

        public static void InitializeRenderer(AdaptiveHostConfig hostConfig)
        {
            try
            {
                _renderer = new AdaptiveCardRenderer();
                if (hostConfig != null)
                {
                    _renderer.HostConfig = hostConfig;
                }

                // Custom resource resolvers
                _renderer.ResourceResolvers.Set("symbol", new MySymbolResourceResolver());
            }
            catch
            {
                if (Debugger.IsAttached)
                {
                    Debugger.Break();
                }
                throw;
            }
        }
    }
}
