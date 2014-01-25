/*
 * Unofficial BBC iPlayer Plug-in for DivX Connected
 * Copyright (C) 2010 Mesmotronic Limited <www.mesmotronic.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 * 02111-1307 USA
 */

var dctk;

function onKeyEvent(event)
{
	switch(event.buttonId)
	{
		case dcKeyEvent.BUTTON_ID_BACK:
			if (window.history.length) window.history.back();
			break;
	}
}

function onLoadComplete()
{
	dctk = connected.toolkit;
	dctk.logicalWidth = 1280;
	dctk.logicalHeight = 720;
	
	var rootPanel = dctk.createPanelCtrl("root", true);
	rootPanel.width = 1280;
	rootPanel.height = 720;
	rootPanel.onUnhandledKeyEvent = onKeyEvent;
	rootPanel.backgroundColor.rgb = 0x000000;
	
	dctk.rootPanel = rootPanel;
	
	var logoImage = dctk.createImageCtrl("logoImage", true);
	logoImage.setRect(0, 350, 1280, 490); // left, bottom, right, top
    logoImage.img.src = "logo.png";
	rootPanel.addChild(logoImage);
	
	var startButton = dctk.createButtonCtrl("startButton", true);
	startButton.setRect(480, 210, 800, 280); // left, bottom, right, top
	startButton.text = "Start";
	startButton.fontSize = 50;
	startButton.onSelect = onStartButtonSelect;
	rootPanel.addChild(startButton);
	
	var footerLabel = dctk.createLabelCtrl("footerLabel", true);
	footerLabel.setRect(0, 20, 1280, 70); // left, bottom, right, top
	footerLabel.textColor.rgb = 0x333333;
	footerLabel.fontSize = 20;
	footerLabel.text = "This is an unofficial BBC iPlayer plug-in for DivX Connected\nlabs.mesmotronic.com/bbciplayer";
	footerLabel.align = dctkLabel.TS_CENTER;
	footerLabel.valign = dctkLabel.TS_MIDDLE;
	rootPanel.addChild(footerLabel);
	
	dctk.focusedElement = startButton;
}

function onStartButtonSelect(event)
{
	var desc = connected.createPageDescriptor();
	desc.uri = "BBCiPlayer.html";
	desc.pageType = dcIConnected.PT_HTML;
	desc.audioCapture = true;
	desc.htmlInputFocusMode = dcIPageDescriptor.FOCUS_MODE_OBJECT;
	
	connected.loadFromPageDescriptor(desc);
}
