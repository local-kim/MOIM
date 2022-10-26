package com.project.cobell.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class FileUtil {

	public static String convertFileName(String fileName) {
		int dot = fileName.lastIndexOf('.');
		String ext = fileName.substring(dot, fileName.length());	// .부터 끝까지 확장자 추출
		
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat format = new SimpleDateFormat();
		
		format.applyPattern("yyyyMMddHHmmss");
		
		return format.format(cal.getTime()) + ext;
	}
}
